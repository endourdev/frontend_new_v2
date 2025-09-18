'use client'

import { useState } from "react";

export default function UploadPage() {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Merci de sélectionner un fichier vidéo");
      return;
    }

    setLoading(true);
    setMessage("");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("videoFile", file);
      formData.append("videoTitle", videoTitle);
      formData.append("videoDescription", videoDescription);
      formData.append("dateOfPublish", new Date().toISOString());

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:80/api/videos/upload", true);
      xhr.withCredentials = true;

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 201) {
          setMessage("Vidéo uploadée avec succès !");
          setVideoTitle("");
          setVideoDescription("");
          setFile(null);
          setProgress(0);
        } else {
          setMessage("❌ Erreur lors de l'upload");
        }
        setLoading(false);
      };

      xhr.onerror = () => {
        setMessage("Une erreur est survenue");
        setLoading(false);
      };

      xhr.send(formData);
    } catch (error) {
      console.error(error);
      setMessage("Une erreur est survenue");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-xl"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Uploader une vidéo</h1>

        <input
          type="text"
          placeholder="Titre de la vidéo"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          className="w-full text-white"
          required
        />

        <textarea
          placeholder="Description"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          className="w-full text-white"
          rows={4}
          required
        />

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="w-full text-sm text-gray-400"
          required
        />

        {loading && (
          <div className="w-full h-3 rounded">
            <div
              className="h-3 rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 text-white"
        >
          {loading ? "Upload en cours..." : "Uploader"}
        </button>

        {message && <p className="text-center mt-4 text-sm">{message}</p>}
      </form>
    </div>
  );
}