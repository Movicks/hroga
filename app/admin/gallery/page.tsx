'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  fetchGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  clearGalleryError,
} from '../../../redux/features/gallery/gallerySlice';

const categories = [
  'Reunion',
  'Birthdays',
  'Visitations',
  'School Projects',
  'Weddings',
  'Charity drives',
];

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const { gallery, loading, error } = useAppSelector((state) => state.gallery);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState('');
  const [category, setCategory] = useState('Reunion');
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    dispatch(fetchGallery());
  }, [dispatch]);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingId(item._id);
      setCategory(item.category);
      setPreviewImage(item.image);
      setImageLink(item.image.startsWith('http') ? item.image : '');
    } else {
      setEditingId(null);
      setCategory('Reunion');
      setImageFile(null);
      setImageLink('');
      setPreviewImage('');
    }
    setIsModalOpen(true);
    dispatch(clearGalleryError());
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setImageFile(null);
    setImageLink('');
    setCategory('Reunion');
    setPreviewImage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const link = e.target.value;
    setImageLink(link);
    if (link) {
      setImageFile(null);
      setPreviewImage(link);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) {
      formData.append('image', imageFile);
    } else if (imageLink) {
      formData.append('image', imageLink);
    }
    formData.append('category', category);

    if (editingId) {
      await dispatch(updateGalleryItem({ id: editingId, formData }));
    } else {
      await dispatch(createGalleryItem(formData));
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      await dispatch(deleteGalleryItem(id));
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm gap-4 flex flex-col justify-between items-center lg:flex-row">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Gallery</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Gallery management</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Organize image collections, review uploads, and maintain featured memories for the website.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm"
        >
          <Plus size={20} />
          <span>Add Image</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex justify-between items-center">
          <span>{error}</span>
          <button onClick={() => dispatch(clearGalleryError())}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && gallery.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">Loading gallery...</div>
        ) : gallery.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500">No gallery items found. Add one to get started!</div>
        ) : (
          gallery.map((item) => (
            <div key={item._id} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all group">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.category}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-slate-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-slate-700" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? 'Edit Image' : 'Add New Image'}
              </h2>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {previewImage && (
                <div className="rounded-2xl overflow-hidden border border-slate-200">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div className="text-center text-slate-500 text-sm">OR</div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Image Link</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageLink}
                  onChange={handleLinkChange}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-full hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all font-medium disabled:opacity-50 shadow-md"
                >
                  {loading ? 'Saving...' : editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
