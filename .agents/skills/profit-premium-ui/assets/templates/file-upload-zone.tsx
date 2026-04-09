/**
 * File Upload Zone Template (Drag & Drop)
 * Use for: Admin panel file uploads
 * Location: src/components/upload/FileUploadZone.tsx
 * 
 * Features:
 * - Drag & drop zone
 * - Click to select
 * - File type validation (PDF, images)
 * - File size validation (50MB)
 * - Image previews
 * - PDF icon for documents
 * - Progress tracking
 * - Metadata form
 */

'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Upload, FileText, Image, X, Loader2 } from 'lucide-react';

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

interface UploadMetadata {
  title: string;
  description?: string;
  city: string;
  propertyType: string;
}

interface FileUploadZoneProps {
  onUpload: (files: File[], metadata: UploadMetadata) => Promise<void>;
  className?: string;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_TYPES = {
  'image/*': ['.jpg', '.jpeg', '.png'],
  'application/pdf': ['.pdf'],
};

export function FileUploadZone({ onUpload, className }: FileUploadZoneProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [metadata, setMetadata] = useState<UploadMetadata>({
    title: '',
    description: '',
    city: '',
    propertyType: '',
  });

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach((rejected) => {
        const { errors } = rejected;
        errors.forEach((error: any) => {
          toast({
            title: 'Ошибка файла',
            description: `${rejected.file.name}: ${error.message}`,
            variant: 'destructive',
          });
        });
      });
    }

    // Add accepted files with previews
    const newFiles = acceptedFiles.map((file) => {
      const fileWithPreview: FileWithPreview = Object.assign(file, {
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
        id: Math.random().toString(36).substring(7),
      });
      return fileWithPreview;
    });

    setFiles((prev) => [...prev, ...newFiles]);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: 'Нет файлов',
        description: 'Выберите файлы для загрузки',
        variant: 'destructive',
      });
      return;
    }

    if (!metadata.title || !metadata.city || !metadata.propertyType) {
      toast({
        title: 'Заполните поля',
        description: 'Укажите название, город и тип недвижимости',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    // Simulate progress for each file
    files.forEach((file) => {
      setUploadProgress((prev) => ({ ...prev, [file.id]: 0 }));

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          const current = prev[file.id] || 0;
          if (current >= 100) {
            clearInterval(interval);
            return prev;
          }
          return { ...prev, [file.id]: current + 10 };
        });
      }, 200);
    });

    try {
      await onUpload(
        files.map((f) => {
          const { preview, id, ...file } = f;
          return file as File;
        }),
        metadata
      );

      toast({
        title: 'Успешно',
        description: `Загружено файлов: ${files.length}`,
      });

      // Clear files and metadata
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
      setFiles([]);
      setMetadata({
        title: '',
        description: '',
        city: '',
        propertyType: '',
      });
      setUploadProgress({});
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить файлы',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        )}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">
          {isDragActive ? 'Отпустите файлы здесь' : 'Перетащите файлы сюда'}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          или нажмите для выбора файлов
        </p>
        <p className="text-xs text-muted-foreground">
          PDF, JPG, PNG до 50MB
        </p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Выбранные файлы ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 border rounded-lg"
              >
                {/* Preview or Icon */}
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : file.type === 'application/pdf' ? (
                    <FileText className="h-6 w-6 text-red-500" />
                  ) : (
                    <Image className="h-6 w-6 text-gray-500" />
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.size)}
                  </p>
                  {uploadProgress[file.id] > 0 && (
                    <Progress
                      value={uploadProgress[file.id]}
                      className="h-1 mt-2"
                    />
                  )}
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-1 hover:bg-muted rounded"
                  disabled={isUploading}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metadata Form */}
      {files.length > 0 && (
        <div className="space-y-4 border-t pt-6">
          <h4 className="font-medium">Информация о материале</h4>

          <div className="space-y-2">
            <Label htmlFor="title">Название *</Label>
            <Input
              id="title"
              value={metadata.title}
              onChange={(e) =>
                setMetadata((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Название презентации"
              disabled={isUploading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Input
              id="description"
              value={metadata.description}
              onChange={(e) =>
                setMetadata((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Краткое описание"
              disabled={isUploading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Город *</Label>
              <Input
                id="city"
                value={metadata.city}
                onChange={(e) =>
                  setMetadata((prev) => ({ ...prev, city: e.target.value }))
                }
                placeholder="Москва"
                disabled={isUploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Тип недвижимости *</Label>
              <Input
                id="propertyType"
                value={metadata.propertyType}
                onChange={(e) =>
                  setMetadata((prev) => ({
                    ...prev,
                    propertyType: e.target.value,
                  }))
                }
                placeholder="Квартира"
                disabled={isUploading}
              />
            </div>
          </div>

          <Button
            onClick={handleUpload}
            className="w-full"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Загрузка...
              </>
            ) : (
              `Загрузить ${files.length} файл(ов)`
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
