'use client';

import { useState } from 'react';
import { Upload, FileText, Image as ImageIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { SkyscraperIllustration } from '@/components/illustrations/BuildingIllustrations';

export function UploadCard() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    propertyType: '',
    file: null as File | null,
    thumbnail: null as File | null,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsUploading(true);
    setMessage('');

    try {
      // Upload main file
      let fileUrl = '';
      if (formData.file) {
        const uploadForm = new FormData();
        uploadForm.append('file', formData.file);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadForm,
        });

        if (!uploadRes.ok) throw new Error('Failed to upload file');
        const uploadData = await uploadRes.json();
        fileUrl = uploadData.url;
      }

      // Upload thumbnail
      let thumbnailUrl = '';
      if (formData.thumbnail) {
        const thumbForm = new FormData();
        thumbForm.append('file', formData.thumbnail);

        const thumbRes = await fetch('/api/upload', {
          method: 'POST',
          body: thumbForm,
        });

        if (!thumbRes.ok) throw new Error('Failed to upload thumbnail');
        const thumbData = await thumbRes.json();
        thumbnailUrl = thumbData.url;
      }

      // Create material
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          city: formData.city,
          propertyType: formData.propertyType,
          fileUrl,
          thumbnailUrl,
        }),
      });

      if (res.ok) {
        setMessageType('success');
        setMessage('Материал успешно добавлен');
        setFormData({
          title: '',
          description: '',
          city: '',
          propertyType: '',
          file: null,
          thumbnail: null,
        });
        // Reset file inputs
        const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
        fileInputs.forEach((input) => (input.value = ''));
      } else {
        setMessageType('error');
        setMessage('Ошибка при добавлении материала');
      }
    } catch {
      setMessageType('error');
      setMessage('Ошибка при загрузке файлов');
    } finally {
      setIsUploading(false);
    }
  }

  if (!isExpanded) {
    return (
      <div className="bg-cream rounded-lg p-6 h-full flex flex-col relative overflow-hidden">
        {/* Decorative illustration */}
        <div className="absolute top-4 right-4 w-20 h-24 opacity-20">
          <SkyscraperIllustration className="w-full h-full text-burgundy" />
        </div>
        
        <div className="w-12 h-12 bg-burgundy rounded-lg flex items-center justify-center mb-4">
          <Upload className="w-6 h-6 text-cream" />
        </div>
        <h3 className="font-serif text-xl text-burgundy-dark font-semibold mb-2">
          Загрузка материалов
        </h3>
        <p className="text-sm text-burgundy-dark/60 mb-4 flex-1">
          Добавьте новую презентацию или документ
        </p>
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-burgundy text-cream py-3 rounded-lg hover:bg-burgundy-medium transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-sm font-medium">Открыть форму</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream rounded-lg p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-burgundy rounded-lg flex items-center justify-center">
            <Upload className="w-5 h-5 text-cream" />
          </div>
          <h3 className="font-serif text-lg text-burgundy-dark font-semibold">
            Загрузка материалов
          </h3>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-burgundy-dark/60 hover:text-burgundy-dark text-sm"
        >
          Закрыть
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg flex items-center gap-2 text-sm ${
            messageType === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {messageType === 'success' ? (
            <CheckCircle className="h-4 w-4 flex-shrink-0" />
          ) : (
            <XCircle className="h-4 w-4 flex-shrink-0" />
          )}
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 flex-1 overflow-auto">
        <div>
          <label className="block text-sm text-burgundy-dark/80 mb-1">
            <FileText className="w-3 h-3 inline mr-1" />
            Название *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="Например: ЖК Новый Горизонт"
            className="w-full px-3 py-2 bg-white border border-burgundy/20 text-burgundy-dark placeholder:text-gray-400 focus:outline-none focus:border-burgundy"
          />
        </div>

        <div>
          <label className="block text-sm text-burgundy-dark/80 mb-1">Описание</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Краткое описание объекта"
            rows={2}
            className="w-full px-3 py-2 bg-white border border-burgundy/20 text-burgundy-dark placeholder:text-gray-400 focus:outline-none focus:border-burgundy resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-burgundy-dark/80 mb-1">Город *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
              placeholder="Москва"
              className="w-full px-3 py-2 bg-white border border-burgundy/20 text-burgundy-dark placeholder:text-gray-400 focus:outline-none focus:border-burgundy"
            />
          </div>
          <div>
            <label className="block text-sm text-burgundy-dark/80 mb-1">Тип *</label>
            <input
              type="text"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              required
              placeholder="Квартира"
              className="w-full px-3 py-2 bg-white border border-burgundy/20 text-burgundy-dark placeholder:text-gray-400 focus:outline-none focus:border-burgundy"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-burgundy-dark/80 mb-1">
            <FileText className="w-3 h-3 inline mr-1" />
            PDF файл *
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
            required
            className="w-full text-sm text-burgundy-dark/70 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-sm file:bg-burgundy file:text-cream hover:file:bg-burgundy-medium cursor-pointer"
          />
          {formData.file && (
            <p className="text-xs text-burgundy-dark/50 mt-1">
              Выбран: {formData.file.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-burgundy-dark/80 mb-1">
            <ImageIcon className="w-3 h-3 inline mr-1" />
            Обложка
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })}
            className="w-full text-sm text-burgundy-dark/70 file:mr-3 file:py-2 file:px-3 file:border-0 file:text-sm file:bg-burgundy/80 file:text-cream hover:file:bg-burgundy cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-3 bg-burgundy text-cream hover:bg-burgundy-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Загрузка...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              Загрузить материал
            </>
          )}
        </button>
      </form>
    </div>
  );
}
