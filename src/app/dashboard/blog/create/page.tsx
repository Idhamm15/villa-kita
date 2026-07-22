"use client";

import HeaderDashboard from "@/component/admin/HeaderDashboard";
import NavbarDashboard from "@/component/admin/NavbarDashboard";
import { useState } from "react";

export default function CreateBlogPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

    const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

    const [images, setImages] = useState<
    {
        id: number;
        url: string;
        title: string;
    }[]
    >([]);

    const loadImages = async () => {
        try {
            const response = await fetch("/api/media");

            const result = await response.json();

            if (!result.success) {
            return;
            }

            setImages(result.data);
        } catch (error) {
            console.error(error);
        }
        };

    const uploadImage = async (file: File) => {
  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/media/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    await loadImages();
  } catch (error) {
    console.error(error);
    alert("Gagal upload gambar");
  } finally {
    setUploading(false);
  }
};

const uploadMultipleFiles = async (files: File[]) => {
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      continue;
    }

    await uploadImage(file);
  }
};

const handleDragEnter = (
  e: React.DragEvent<HTMLDivElement>
) => {
  e.preventDefault();
  e.stopPropagation();

  setDragActive(true);
};

const handleDragLeave = (
  e: React.DragEvent<HTMLDivElement>
) => {
  e.preventDefault();
  e.stopPropagation();

  setDragActive(false);
};

const handleDragOver = (
  e: React.DragEvent<HTMLDivElement>
) => {
  e.preventDefault();
  e.stopPropagation();
};

const handleDrop = async (
  e: React.DragEvent<HTMLDivElement>
) => {
  e.preventDefault();
  e.stopPropagation();

  setDragActive(false);

  const files = Array.from(
    e.dataTransfer.files || []
  );

  await uploadMultipleFiles(files);
};

const handleFileSelect = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const files = Array.from(
    e.target.files || []
  );

  await uploadMultipleFiles(files);

  e.target.value = "";
};


  const [form, setForm] = useState({
      title: "",
      slug: "",
      meta_description: "",
      category: "",
      thumbnail_url: "",
      body: "",
  });

  const handleInputChange = (
      e: React.ChangeEvent <
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >
  ) => {

      const {
          name,
          value
      } = e.target;

      setForm((prev) => ({
          ...prev,
          [name]: value,
      }));
  };

  const handleEditorChange = (
    e: React.FormEvent<HTMLDivElement>
    ) => {
    const html = e.currentTarget?.innerHTML ?? "";

    setForm((prev) => ({
        ...prev,
        body: html,
    }));
  };

  const applyFormat = (command: string, value ? : string) => {
      document.execCommand(command, false, value);
  };

  const insertLink = () => {
      const url = prompt("Masukkan URL");

      if (!url) return;

      document.execCommand("createLink", false, url);
  };

    const handleInsertImage = () => {
    if (!selectedImage) return;

    document.execCommand(
        "insertHTML",
        false,
        `<img
        src="${selectedImage}"
        style="max-width:100%;border-radius:12px;margin:16px 0"
        />`
    );

    setShowMediaModal(false);
    };

  const handleSubmit = async () => {
      try {
          const response = await fetch("/api/blogs", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(form),
          });

          const result = await response.json();

          if (!result.success) {
              alert(result.message);
              return;
          }

          alert("Artikel berhasil dibuat");

          setForm({
              title: "",
              slug: "",
              meta_description: "",
              category: "",
              thumbnail_url: "",
              body: "",
          });

      } catch (error) {
          console.error(error);
          alert("Terjadi kesalahan");
      }
  };

  const changeTextColor = () => {
    const color = prompt("Masukkan warna (contoh: red, #ff0000)");

    if (!color) return;

    document.execCommand("foreColor", false, color);
    };

    const changeBackgroundColor = () => {
    const color = prompt("Masukkan warna background (contoh: yellow, #ffff00)");

    if (!color) return;

    document.execCommand("hiliteColor", false, color);
    };

    const textColors = [
        "#000000",
        "#374151",
        "#6B7280",

        "#DC2626",
        "#EA580C",
        "#CA8A04",

        "#16A34A",
        "#0891B2",
        "#2563EB",

        "#7C3AED",
        "#DB2777",
    ];

  return (

    
    <div className="min-h-screen bg-white flex overflow-hidden">
      <HeaderDashboard
        sidebarOpen={sidebarOpen}
        onCloseSidebar={() => setSidebarOpen(false)}
      />

      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <NavbarDashboard
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        {/* Content */}
        <div className="bg-gray-100 rounded-3xl p-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tambah Artikel
              </h1>

              <p className="text-gray-500 mt-1">
                Buat artikel baru untuk website
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

            {/* Editor */}
            <div className="xl:col-span-3">

              <div className="bg-white rounded-3xl border border-gray-200 p-8">

                <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Tambahkan Judul"
                className="w-full text-5xl font-bold border-none outline-none bg-transparent text-gray-900 mb-8"
                />  

                {/* Editor Toolbar */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 pb-4 mb-4">

                <div className="flex flex-wrap gap-2">

                    <button
                    type="button"
                    onClick={() => applyFormat("bold")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold"
                    >
                    B
                    </button>

                    <button
                    type="button"
                    onClick={() => applyFormat("italic")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 italic"
                    >
                    I
                    </button>

                    <button
                    type="button"
                    onClick={() => applyFormat("underline")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    U
                    </button>

                    <button
                    type="button"
                    onClick={() => applyFormat("formatBlock", "<h1>")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    H1
                    </button>

                    <button
                    type="button"
                    onClick={() => applyFormat("formatBlock", "<h2>")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    H2
                    </button>

                    <button
                    type="button"
                    onClick={() => applyFormat("insertUnorderedList")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    • List
                    </button>

                    <button
                    type="button"
                    onClick={() => applyFormat("insertOrderedList")}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    1. List
                    </button>

                    <button
                    type="button"
                    onClick={insertLink}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    Link
                    </button>

                    <button
                    type="button"
                    onClick={() => setShowMediaModal(true)}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    Image
                    </button>

                    <button
                        type="button"
                        onClick={() => applyFormat("justifyLeft")}
                        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    ⬅
                    </button>

                    <button
                        type="button"
                        onClick={() => applyFormat("justifyCenter")}
                        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    ⬌
                    </button>

                    <button
                        type="button"
                        onClick={() => applyFormat("justifyRight")}
                        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    ➡
                    </button>

                    <button
                        type="button"
                        onClick={() => applyFormat("justifyFull")}
                        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    ☰
                    </button>

                    <div className="w-px h-8 bg-gray-300 mx-1" />

                    <div className="flex items-center gap-2 px-2 py-1 border rounded-lg bg-gray-50">

                    <span className="text-sm text-gray-500">
                        Text
                    </span>

                    {textColors.map((color) => (
                        <button
                        key={color}
                        type="button"
                        title={color}
                        onClick={() =>
                            applyFormat(
                            "foreColor",
                            color
                            )
                        }
                        className="
                            w-6
                            h-6
                            rounded-full
                            border
                            border-gray-300
                            hover:scale-110
                            transition
                        "
                        style={{
                            backgroundColor: color,
                        }}
                        />
                    ))}

                    </div>

                    <button
                        type="button"
                        onClick={changeBackgroundColor}
                        className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                    >
                    🖍 Highlight
                    </button>

                </div>

                </div>

                {/* Editor Area */}
                <div
                id="editor"
                contentEditable
                suppressContentEditableWarning
                onInput={handleEditorChange}
                className="
                    min-h-[700px]
                    p-8
                    rounded-2xl
                    bg-white
                    outline-none
                    text-gray-700
                    leading-8
                    text-lg
                "
                style={{
                    whiteSpace: "pre-wrap",
                }}
                />

              </div>

            </div>

            {showMediaModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">

                <div className="bg-white w-full max-w-5xl rounded-3xl p-6">

                    <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-bold">
                        Media Library
                    </h2>

                    <button
                        onClick={() => setShowMediaModal(false)}
                    >
                        ✕
                    </button>

                    </div>

                    {/* Upload */}
                    <div
                    className="
                        border-2
                        border-dashed
                        border-gray-300
                        rounded-2xl
                        p-10
                        text-center
                        mb-6
                    "
                    >
                    Drag & Drop Image
                    </div>

                    {/* Gallery */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

                    {images.map((image) => (
                        <div
                        key={image.id}
                        onClick={() =>
                            setSelectedImage(image.url)
                        }
                        className={`
                            border-2
                            rounded-xl
                            cursor-pointer
                            overflow-hidden
                            ${
                            selectedImage === image.url
                                ? "border-blue-500"
                                : "border-gray-200"
                            }
                        `}
                        >
                        <img
                            src={image.url}
                            alt={image.title}
                            className="w-full h-24 object-cover"
                        />
                        </div>
                    ))}

                    </div>

                    <div className="mt-6 flex justify-end gap-3">

                    <button
                        onClick={() =>
                        setShowMediaModal(false)
                        }
                        className="px-5 py-2 bg-gray-100 rounded-xl"
                    >
                        Batal
                    </button>

                    <button
                        onClick={handleInsertImage}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl"
                    >
                        Insert Image
                    </button>

                    </div>

                </div>

                </div>
            )}

            {/* Sidebar */}
            <div className="space-y-6">

              {/* Publish */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Publish
                </h3>

                <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition mb-3"
                >
                Publish Artikel
                </button>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition">
                  Simpan Draft
                </button>

              </div>

              {/* Thumbnail */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Thumbnail
                </h3>

                <div className="border-2 border-dashed border-gray-300 rounded-2xl h-48 flex items-center justify-center text-gray-500 cursor-pointer hover:border-blue-500 transition">
                  Upload Thumbnail
                </div>

              </div>

              {/* Category */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Kategori
                </h3>

                <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-xl p-3"
                >
                <option value="">Pilih Kategori</option>
                <option value="website">Website</option>
                <option value="aplikasi">Aplikasi</option>
                <option value="erp">ERP</option>
                <option value="digital-marketing">Digital Marketing</option>
                </select>

              </div>

              {/* SEO */}
              <div className="bg-white rounded-3xl border border-gray-200 p-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                  SEO
                </h3>

                <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleInputChange}
                placeholder="Slug"
                className="w-full border border-gray-200 rounded-xl p-3 mb-3"
                />

                <textarea
                rows={4}
                name="meta_description"
                value={form.meta_description}
                onChange={handleInputChange}
                placeholder="Meta Description"
                className="w-full border border-gray-200 rounded-xl p-3"
                />

              </div>
              

            </div>

          </div>

        </div>


        
      </main>

      
    </div>
  );
}

