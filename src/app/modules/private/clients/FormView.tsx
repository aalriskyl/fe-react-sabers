/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";

interface Client {
  id: string;
  name: string;
  logo: string | null;
  company: string;
  created_at: string;
  updated_at: string;
}

interface ClientFormData {
  name: string;
  logo: File | null;
  company: string;
}

const ClientsFormView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    logo: null,
    company: "",
  });

  const [previewLogo, setPreviewLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          setLoading(true);
          const response = await api.get<Client>(`/api/clients/${id}`);

          setFormData({
            name: response.data.name,
            logo: null, // We don't set the File object here
            company: response.data.company,
          });

          if (response.data.logo) {
            // Construct the full logo URL
            const logoUrl = `http://api.sabers.web.id/uploads/clients/${response.data.logo}`;
            setPreviewLogo(logoUrl);
          }

          setError(null);
        } catch (error) {
          setError("Failed to fetch client details");
        } finally {
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [id, isNew]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        logo: file,
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logo: null,
    }));
    setPreviewLogo(null);

    // Clear the file input
    const fileInput = document.getElementById("logo") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Validate required fields
      if (!formData.name || !formData.company) {
        setError("Name and Company are required fields.");
        setSaving(false);
        return;
      }

      // Create FormData for file upload
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("company", formData.company);

      // Handle logo cases
      if (formData.logo) {
        formPayload.append("logo", formData.logo);
      } else if (!previewLogo && !isNew) {
        // If editing and no preview (logo was removed)
        formPayload.append("remove_logo", "true");
      }

      if (!id) {
        // Create new client
        await api.post("/api/clients", formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Update existing client - use URL params AND FormData
        await api.put(`/api/clients/${id}`, formPayload, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            // Add params separately
            name: formData.name,
            company: formData.company,
            logo: formData.logo ? formData.logo.name : "",
          },
        });
      }

      navigate("/clients");
    } catch (error) {
      setError(!id ? "Failed to create client" : "Failed to update client");
      setSaving(false);
    }
  };

  if (loading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {!id ? "Create New" : "Edit"} Client
          </h1>
          <button
            onClick={() => navigate("/clients")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Back to Clients
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
          encType="multipart/form-data"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="company"
            >
              Company <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="logo"
            >
              Logo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="logo"
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewLogo && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">Logo Preview:</p>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove Logo
                  </button>
                </div>
                <img
                  src={previewLogo}
                  alt="Logo preview"
                  className="h-20 w-20 object-contain border rounded"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={saving}
            >
              {saving
                ? isNew
                  ? "Creating..."
                  : "Saving..."
                : isNew
                ? "Create Client"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientsFormView;
