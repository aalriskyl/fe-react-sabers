/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";

interface Certification {
  id: string;
  certification_name: string;
  type: string;
  description: string | null;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
  created_at: string;
  updated_at: string;
}

interface CertificationFormData {
  certification_name: string;
  type: string;
  description: string | null;
  issue_date: string;
  expiration_date: string | null;
  credential_id: string | null;
  credential_url: string | null;
}

const CertificationFormView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState<CertificationFormData>({
    certification_name: "",
    type: "",
    description: null,
    issue_date: new Date().toISOString().split("T")[0], // Default to today's date
    expiration_date: null,
    credential_id: null,
    credential_url: null,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch certification data if we have an ID (edit mode)
    if (id) {
      const fetchCertification = async () => {
        try {
          setLoading(true);
          const response = await api.get<Certification>(
            `/api/certifications/${id}`
          );

          setFormData({
            certification_name: response.data.certification_name,
            type: response.data.type,
            description: response.data.description || null,
            issue_date: response.data.issue_date,
            expiration_date: response.data.expiration_date,
            credential_id: response.data.credential_id,
            credential_url: response.data.credential_url,
          });

          setError(null);
        } catch (error) {
          setError("Failed to fetch certification details");
        } finally {
          setLoading(false);
        }
      };

      fetchCertification();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Validate required fields
      if (
        !formData.certification_name ||
        !formData.type ||
        !formData.issue_date
      ) {
        setError("All required fields must be filled.");
        setSaving(false);
        return;
      }

      if (!id) {
        // Create new certification
        await api.post("/api/certifications", formData);
      } else {
        // Update existing certification
        await api.put(`/api/certifications/${id}`, formData);
      }

      navigate("/certifications");
    } catch (error) {
      setError(
        id ? "Failed to update certification" : "Failed to create certification"
      );
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
            {id ? "Edit" : "Create New"} Certification
          </h1>
          <button
            onClick={() => navigate("/certifications")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Back to Certifications
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
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="certification_name"
            >
              Certification Name <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="certification_name"
              name="certification_name"
              type="text"
              value={formData.certification_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type <span className="text-red-500">*</span>
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Type --</option>
              <option value="Company">Company</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="issue_date"
            >
              Issue Date <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="issue_date"
              name="issue_date"
              type="date"
              value={formData.issue_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="expiration_date"
            >
              Expiration Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="expiration_date"
              name="expiration_date"
              type="date"
              value={formData.expiration_date || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="credential_id"
            >
              Credential ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="credential_id"
              name="credential_id"
              type="text"
              value={formData.credential_id || ""}
              onChange={handleChange}
              placeholder="e.g. ABC123-XYZ456"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="credential_url"
            >
              Credential URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="credential_url"
              name="credential_url"
              type="url"
              value={formData.credential_url || ""}
              onChange={handleChange}
              placeholder="https://example.com/verify/credential"
            />
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
                ? "Create Certification"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationFormView;
