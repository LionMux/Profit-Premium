'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Pencil,
  Trash2,
  Plus,
  GripVertical,
  ExternalLink,
  ImageIcon,
  X,
} from 'lucide-react';

interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link?: string | null;
  order: number;
  isActive: boolean;
}

interface StoriesManagerProps {
  stories: Story[];
  className?: string;
}

export function StoriesManager({ stories, className }: StoriesManagerProps) {
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [deletingStory, setDeletingStory] = useState<Story | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleEdit = (story: Story) => {
    setEditingStory(story);
  };

  const handleDelete = (story: Story) => {
    setDeletingStory(story);
  };

  const confirmDelete = async () => {
    if (!deletingStory) return;

    try {
      const response = await fetch(`/api/stories/${deletingStory.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to delete story');
      }
    } catch (error) {
      console.error('Error deleting story:', error);
    }

    setDeletingStory(null);
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingStory) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      link: formData.get('link') as string,
      isActive: formData.get('isActive') === 'on',
    };

    try {
      const response = await fetch(`/api/stories/${editingStory.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to update story');
      }
    } catch (error) {
      console.error('Error updating story:', error);
    }

    setEditingStory(null);
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      link: formData.get('link') as string,
      imageUrl: formData.get('imageUrl') as string,
    };

    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to create story');
      }
    } catch (error) {
      console.error('Error creating story:', error);
    }

    setIsCreateOpen(false);
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl text-cream font-semibold">
            Управление сторис
          </h3>
          <p className="text-sm text-cream/60 mt-1">
            {stories.length} {stories.length === 1 ? 'стори' : stories.length < 5 ? 'стори' : 'сторис'}
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-cream text-burgundy-dark hover:bg-cream/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] bg-white border-0">
            <DialogHeader>
              <DialogTitle className="text-burgundy-dark text-xl font-serif">
                Новая стори
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Заполните информацию о новой стори
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-burgundy-dark">
                  Заголовок
                </Label>
                <Textarea
                  id="title"
                  name="title"
                  placeholder="Введите заголовок стори"
                  required
                  className="border-burgundy/20 focus:border-burgundy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-burgundy-dark">
                  URL изображения
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  required
                  className="border-burgundy/20 focus:border-burgundy"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link" className="text-burgundy-dark">
                  Ссылка (опционально)
                </Label>
                <Input
                  id="link"
                  name="link"
                  placeholder="https://example.com"
                  className="border-burgundy/20 focus:border-burgundy"
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Отмена
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-burgundy hover:bg-burgundy-dark text-white"
                >
                  Создать
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className={cn(
              'group relative bg-cream/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden',
              'transition-all duration-300 hover:bg-cream/10',
              !story.isActive && 'opacity-60'
            )}
          >
            {/* Image */}
            <div className="aspect-[4/3] relative">
              <Image
                src={story.imageUrl}
                alt={story.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {!story.isActive && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs uppercase tracking-wider">
                    Неактивно
                  </span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-cream text-sm line-clamp-2 mb-3">
                {story.title}
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-cream/60 hover:text-cream hover:bg-white/10"
                        onClick={() => handleEdit(story)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-white border-0">
                      <DialogHeader>
                        <DialogTitle className="text-burgundy-dark text-xl font-serif">
                          Редактировать стори
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSaveEdit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-title" className="text-burgundy-dark">
                            Заголовок
                          </Label>
                          <Textarea
                            id="edit-title"
                            name="title"
                            defaultValue={editingStory?.title}
                            required
                            className="border-burgundy/20 focus:border-burgundy"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-link" className="text-burgundy-dark">
                            Ссылка
                          </Label>
                          <Input
                            id="edit-link"
                            name="link"
                            defaultValue={editingStory?.link || ''}
                            className="border-burgundy/20 focus:border-burgundy"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="edit-isActive"
                            name="isActive"
                            defaultChecked={editingStory?.isActive}
                            className="rounded border-burgundy/20"
                          />
                          <Label htmlFor="edit-isActive" className="text-burgundy-dark">
                            Активно
                          </Label>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              Отмена
                            </Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            className="bg-burgundy hover:bg-burgundy-dark text-white"
                          >
                            Сохранить
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-cream/60 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => handleDelete(story)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[400px] bg-white border-0">
                      <DialogHeader>
                        <DialogTitle className="text-burgundy-dark text-xl font-serif">
                          Удалить стори?
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Это действие нельзя отменить. Стори будет удалена навсегда.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="gap-2">
                        <DialogClose asChild>
                          <Button variant="outline">Отмена</Button>
                        </DialogClose>
                        <Button
                          onClick={confirmDelete}
                          className="bg-red-500 hover:bg-red-600 text-white"
                        >
                          Удалить
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {story.link && (
                  <a
                    href={story.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/40 hover:text-cream transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {stories.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-cream/20 rounded-xl">
          <ImageIcon className="h-12 w-12 text-cream/30 mx-auto mb-4" />
          <p className="text-cream/60">Нет сторис</p>
          <p className="text-cream/40 text-sm mt-1">
            Добавьте первую стори, чтобы она появилась в карусели
          </p>
        </div>
      )}
    </div>
  );
}
