'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, Loader2, Check, X } from 'lucide-react';

export function UploadMaterialCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/materials', {
      //   method: 'POST',
      //   body: formData,
      // });

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
        setSelectedFile(null);
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error uploading material:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'w-full h-full min-h-[200px] p-6 rounded-xl',
            'bg-cream text-burgundy-dark',
            'hover:bg-cream/90 transition-all duration-500',
            'flex flex-col items-start group'
          )}
        >
          <div className="h-12 w-12 rounded-lg bg-burgundy-dark/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
            <Upload className="h-6 w-6 text-burgundy-dark" />
          </div>

          <h3 className="text-sm font-bold tracking-[0.15em] mb-2">
            ЗАГРУЗИТЬ МАТЕРИАЛ
          </h3>
          <p className="text-sm text-burgundy-dark/70 leading-relaxed text-left">
            Добавить новую презентацию или документ
          </p>

          <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-medium text-burgundy-dark/70 group-hover:text-burgundy-dark transition-colors">
            <span>Начать загрузку</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white border-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-burgundy-dark text-2xl font-serif">
            Загрузить материал
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Заполните информацию о новом материале
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-burgundy-dark mb-2">
              Успешно загружено!
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Материал добавлен и доступен в разделе &quot;Материалы&quot;
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-burgundy-dark">
                Название
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Название объекта"
                required
                className="border-burgundy/20 focus:border-burgundy h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-burgundy-dark">
                Описание
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Краткое описание объекта"
                rows={3}
                className="border-burgundy/20 focus:border-burgundy resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-burgundy-dark">
                  Город
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Москва"
                  required
                  className="border-burgundy/20 focus:border-burgundy h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyType" className="text-burgundy-dark">
                  Тип недвижимости
                </Label>
                <Input
                  id="propertyType"
                  name="propertyType"
                  placeholder="Квартира"
                  required
                  className="border-burgundy/20 focus:border-burgundy h-11"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-burgundy-dark">Файл презентации</Label>
              <div className="border-2 border-dashed border-burgundy/20 rounded-lg p-6 hover:border-burgundy/40 transition-colors">
                <input
                  type="file"
                  name="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  required
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  {selectedFile ? (
                    <>
                      <div className="h-12 w-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
                        <FileText className="h-6 w-6 text-burgundy" />
                      </div>
                      <p className="text-sm font-medium text-burgundy-dark">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} МБ
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedFile(null);
                        }}
                        className="mt-3 text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                      >
                        <X className="h-3 w-3" />
                        Удалить
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="h-12 w-12 rounded-full bg-burgundy/10 flex items-center justify-center mb-3">
                        <Upload className="h-6 w-6 text-burgundy" />
                      </div>
                      <p className="text-sm font-medium text-burgundy-dark">
                        Нажмите для загрузки
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOC до 50 МБ
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Thumbnail Upload (Optional) */}
            <div className="space-y-2">
              <Label className="text-burgundy-dark">
                Обложка <span className="text-muted-foreground">(опционально)</span>
              </Label>
              <Input
                type="file"
                name="thumbnail"
                accept="image/*"
                className="border-burgundy/20 focus:border-burgundy h-11 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-burgundy/10 file:text-burgundy hover:file:bg-burgundy/20"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !selectedFile}
                className="w-full h-12 bg-burgundy hover:bg-burgundy-dark text-white"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Загрузить материал
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
