/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import useFetchClients from "../../../hooks/useFetchClients";

interface Project {
  id: string;
  title: string;
  client_id: string | null;
  description: string;
  thumbnail: string;
  start_date: string;
  end_date: string | null;
  status: string;
  budget: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
  client_name: string | null;
  client_company: string | null;
  images: ProjectImage[] | null;
}

interface ProjectImage {
  id: string;
  project_id: string;
  image_path: string;
  created_at: string;
  updated_at: string;
}

interface ProjectFormData {
  title: string;
  description: string;
  client_id: string | null;
  status: string;
  start_date: string;
  end_date: string | null;
  budget: string | null;
  location: string | null;
  thumbnail: string | null;
  images: File[] | string[] | null;
}

const ProjectFormView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  // Base URL for images
  const imagesBaseUrl = "https://api.sabers.web.id/uploads/projects/";

  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    client_id: null,
    status: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: null,
    budget: null,
    location: null,
    thumbnail: null,
    images: null,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Use the custom hook to fetch clients
  const {
    clients,
    loading: clientsLoading,
    error: clientsError,
  } = useFetchClients();

  useEffect(() => {
    // Only fetch project data if we have an ID (edit mode)
    if (id && id !== "new") {
      const fetchProject = async () => {
        try {
          setLoading(true);
          const response = await api.get<Project>(`/api/projects/${id}`);

          const projectData = response.data;

          setFormData({
            title: projectData.title,
            description: projectData.description,
            client_id: projectData.client_id,
            status: projectData.status,
            start_date: projectData.start_date,
            end_date: projectData.end_date,
            budget: projectData.budget,
            location: projectData.location,
            thumbnail: projectData.thumbnail,
            images: projectData.images
              ? projectData.images.map((img) => img.image_path)
              : null,
          });

          if (projectData.images) {
            setImagePreviews(
              projectData.images.map(
                (img) => `${imagesBaseUrl}${img.image_path}`
              )
            );
          }

          setError(null);
        } catch (error) {
          setError("Failed to fetch project details");
        } finally {
          setLoading(false);
        }
      };

      fetchProject();
    }
  }, [id, imagesBaseUrl]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check total number of images (existing + new)
    const currentImageCount = formData.images?.length || 0;
    const newImageCount = Math.min(files.length, 3 - currentImageCount);

    if (newImageCount <= 0) {
      alert("You can only upload up to 3 images");
      e.target.value = ""; // Reset the file input
      return;
    }

    // Limit to remaining available slots (max 3 total)
    const selectedFiles = Array.from(files).slice(0, newImageCount);

    // Create preview URLs
    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    // Combine existing images with new ones if any
    const existingImages = formData.images || [];
    const updatedImages = [
      ...(Array.isArray(existingImages) ? existingImages : []),
      ...selectedFiles,
    ] as File[];

    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));

    // Update previews with existing and new ones
    setImagePreviews((prev) => [...prev, ...previewUrls]);

    // If no thumbnail is selected yet, set the first image as thumbnail
    if (!formData.thumbnail && selectedFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: selectedFiles[0].name,
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    // Get current images and create a new array without the removed image
    const currentImages = formData.images || [];

    // Check if the array contains Files or strings
    const isFileArray =
      currentImages.length > 0 && currentImages[0] instanceof File;

    // Create a new array with the correct type
    const newImages = isFileArray
      ? (currentImages as File[]).filter((_, i) => i !== index)
      : (currentImages as string[]).filter((_, i) => i !== index);

    const removedImage = currentImages[index];

    // Remove the corresponding image preview
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newImagePreviews);

    // Update form data with the new images array (type-safe)
    const updatedFormData: Partial<ProjectFormData> = {
      images:
        newImages.length > 0
          ? isFileArray
            ? (newImages as File[])
            : (newImages as string[])
          : null,
    };

    // Check if the removed image was the thumbnail
    const wasThumbnail =
      formData.thumbnail &&
      (removedImage instanceof File
        ? removedImage.name === formData.thumbnail
        : removedImage === formData.thumbnail);

    // If the removed image was the thumbnail, select a new one if available
    if (wasThumbnail) {
      updatedFormData.thumbnail =
        newImages.length > 0
          ? newImages[0] instanceof File
            ? newImages[0].name
            : (newImages[0] as string)
          : null;
    }

    // Update the form data once with all changes
    setFormData((prev) => ({
      ...prev,
      ...updatedFormData,
    }));
  };

  const handleThumbnailSelect = (imageName: string) => {
    setFormData((prev) => ({
      ...prev,
      thumbnail: imageName,
    }));
  };

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

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");

    setFormData((prev) => ({
      ...prev,
      budget: value || null,
    }));
  };

  const formatIDR = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(value)
      .replace("Rp", "IDR");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Validate required fields
      if (
        !formData.title ||
        !formData.description ||
        !formData.start_date ||
        !formData.status
      ) {
        setError("All required fields must be filled.");
        setSaving(false);
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      formDataObj.append("status", formData.status);
      formDataObj.append("start_date", formData.start_date);

      if (formData.end_date) formDataObj.append("end_date", formData.end_date);
      if (formData.budget) formDataObj.append("budget", formData.budget);
      if (formData.location) formDataObj.append("location", formData.location);

      // Handle client_id - send empty string if null
      formDataObj.append("client_id", formData.client_id || "");

      // Handle thumbnail
      if (formData.thumbnail) {
        // If we have File objects (new uploads)
        if (formData.images && formData.images[0] instanceof File) {
          const thumbnailFile = (formData.images as File[]).find(
            (file) => file.name === formData.thumbnail
          );
          if (thumbnailFile) {
            formDataObj.append("thumbnail", thumbnailFile);
          }
        } else {
          // For existing images
          formDataObj.append("thumbnail", formData.thumbnail);
        }
      }

      // Append images
      if (formData.images && formData.images.length > 0) {
        if (formData.images[0] instanceof File) {
          // New image uploads
          (formData.images as File[]).forEach((file) => {
            formDataObj.append(`images[]`, file);
          });
        } else {
          // Existing images (just send the paths)
          (formData.images as string[]).forEach((imgPath) => {
            formDataObj.append(`images[]`, imgPath);
          });
        }
      }

      if (!id) {
        // Create new project - just POST the form data
        await api.post("/api/projects", formDataObj, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Update existing project - use PUT with query params
        const queryParams = new URLSearchParams({
          title: formData.title,
          description: formData.description,
          start_date: formData.start_date,
          status: formData.status,
          ...(formData.end_date && { end_date: formData.end_date }),
          ...(formData.budget && { budget: formData.budget }),
          ...(formData.location && { location: formData.location }),
          client_id: formData.client_id || "",
          ...(formData.thumbnail && { thumbnail: formData.thumbnail }),
        });

        await api.put(
          `/api/projects/${id}?${queryParams.toString()}`,
          formDataObj,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      navigate("/projects");
    } catch (error) {
      setError(!id ? "Failed to create project" : "Failed to update project");
      setSaving(false);
    }
  };

  if (loading || clientsLoading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {!id ? "Create New" : "Edit"} Project
          </h1>
          <button
            onClick={() => navigate("/projects")}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Back to Projects
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {clientsError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {clientsError}
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
              Title <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Category <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Client Dropdown */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="client_id"
            >
              Client
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="client_id"
              name="client_id"
              value={formData.client_id || ""}
              onChange={handleChange}
            >
              <option value="">-- Select a Client --</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} {client.company ? `(${client.company})` : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="status"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="planned">Planned</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="start_date"
            >
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="end_date"
            >
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="end_date"
              name="end_date"
              type="date"
              value={formData.end_date || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="budget"
            >
              Budget
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
              id="budget"
              name="budget"
              type="text"
              value={
                formData.budget ? formatIDR(parseInt(formData.budget, 10)) : ""
              }
              onChange={handleBudgetChange}
              placeholder="e.g. 5000000 (will display as IDR 5.000.000)"
            />
          </div>

          {/* Images Upload */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="images"
            >
              Project Images (Max 3 dan 5MB)
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight ${
                (formData.images?.length || 0) >= 3
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              id="images"
              name="images"
              type="file"
              onChange={handleImagesChange}
              accept="image/*"
              multiple
              disabled={(formData.images?.length || 0) >= 3}
            />
            {(formData.images?.length || 0) >= 3 && (
              <p className="text-xs text-red-500 mt-1">
                Maximum 3 images reached. Remove some images to add more.
              </p>
            )}
            {!isNew && formData.images && formData.images.length > 0 && (
              <p className="text-xs text-gray-500 mt-1">
                Current images will be replaced with new selections
              </p>
            )}
          </div>

          {/* Image Previews and Thumbnail Selection */}
          {imagePreviews.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Thumbnail
              </label>
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((preview, index) => {
                  const imageName =
                    typeof formData.images?.[index] === "string"
                      ? (formData.images[index] as string)
                      : (formData.images?.[index] as File)?.name || "";

                  return (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Project preview ${index + 1}`}
                        className={`h-32 w-auto object-cover rounded border-2 ${
                          formData.thumbnail === imageName
                            ? "border-blue-500"
                            : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => handleThumbnailSelect(imageName)}
                        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs rounded ${
                          formData.thumbnail === imageName
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {formData.thumbnail === imageName
                          ? "Selected"
                          : "Select"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight h-20"
              id="location"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              placeholder="e.g. Jl. Sudirman No. 123, Jakarta Selatan, DKI Jakarta"
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
                ? "Create Project"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormView;
