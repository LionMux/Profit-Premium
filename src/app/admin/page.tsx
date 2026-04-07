'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    city: '',
    propertyType: '',
    file: null as File | null,
    thumbnail: null as File | null,
  });

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
        setMessage('Материал успешно добавлен');
        setFormData({
          title: '',
          description: '',
          city: '',
          propertyType: '',
          file: null,
          thumbnail: null,
        });
      } else {
        setMessage('Ошибка при добавлении материала');
      }
    } catch {
      setMessage('Ошибка при загрузке файлов');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Админ-панель</h1>

        <Card>
          <CardHeader>
            <CardTitle>Загрузка материалов</CardTitle>
            <CardDescription>Добавьте новую презентацию или документ</CardDescription>
          </CardHeader>
          <CardContent>
            {message && (
              <div
                className={`mb-4 p-3 rounded-md text-sm ${
                  message.includes('успешно')
                    ? 'bg-green-50 text-green-600'
                    : 'bg-red-50 text-red-500'
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Название *</label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full min-h-[80px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Город *</label>
                  <Input
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Тип недвижимости *</label>
                  <Input
                    value={formData.propertyType}
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Файл презентации (PDF) *</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={e => setFormData({ ...formData, file: e.target.files?.[0] || null })}
                  required
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Обложка (изображение)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e =>
                    setFormData({ ...formData, thumbnail: e.target.files?.[0] || null })
                  }
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/80"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isUploading}>
                {isUploading ? 'Загрузка...' : 'Загрузить материал'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
