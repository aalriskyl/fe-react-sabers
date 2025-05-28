import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";

interface Slider {
  id: string;
  title: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface SliderFormData {
  title: string;
  image: File | string | null;
}

const SlidersFormView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  // Base URL for images
  const imagesBaseUrl = "https://api.sabers.web.id/uploads/sliders/";

  const [formData, setFormData] = useState<SliderFormData>({
    title: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch slider data if we have an ID (edit mode)
    if (id && id !== "new") {
      const fetchSlider = async () => {
        try {
          setLoading(true);
          const response = await api.get<Slider>(`/api/sliders/${id}`);

          const sliderData = response.data;

          setFormData({
            title: sliderData.title,
            image: sliderData.image,
          });

          if (sliderData.image) {
            setLogoPreview(`${imagesBaseUrl}${sliderData.image}`);
          }

          setError(null);
        } catch (error) {
          setError("Failed to fetch slider details");
        } finally {
          setLoading(false);
        }
      };

      fetchSlider();
    }
  }, [id, imagesBaseUrl]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    // Validate file size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size should be less than 5MB");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      image: file,
    }));

    setLogoPreview(previewUrl);
    setError(null);
  };

  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setLogoPreview(null);

    // Clear the file input
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { title, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [title]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Validate required fields
      if (!formData.title || !formData.image) {
        setError("Name and image are required");
        setSaving(false);
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);

      // Handle image - can be File (new upload) or string (existing)
      if (formData.image instanceof File) {
        formDataObj.append("image", formData.image);
      } else if (typeof formData.image === "string") {
        formDataObj.append("image", formData.image);
      }

      if (!id) {
        // Create new slider
        await api.post("/api/sliders", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Update existing slider
        await api.put(`/api/sliders/${id}`, formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      navigate("/sliders");
    } catch (error) {
      setError(!id ? "Failed to create slider" : "Failed to update slider");
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
            {!id ? "Create New" : "Edit"} Slider
          </h1>
          <button
            onClick={() => navigate("/sliders")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Back to Sliders
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
              htmlFor="title"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="title"
              title="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Logo <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="image"
              title="image"
              type="file"
              onChange={handleLogoChange}
              accept="image/*"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recommended size: 800x400px, Max size: 5MB
            </p>
          </div>

          {/* Logo Preview */}
          {logoPreview && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Logo Preview
              </label>
              <div className="relative group">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-32 w-auto object-contain rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </div>
            </div>
          )}

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
                ? "Create Slider"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SlidersFormView;
