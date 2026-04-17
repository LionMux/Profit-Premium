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
import { Send, Check, Loader2 } from 'lucide-react';

export function TransferClientDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      phone: formData.get('phone') as string,
      city: formData.get('city') as string,
    };

    try {
      // Simulate API call - replace with actual Bitrix24 integration
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/transfer-client', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      setIsSuccess(true);

      // Reset after showing success
      setTimeout(() => {
        setIsSuccess(false);
        setIsOpen(false);
      }, 2000);
    } catch (error) {
      console.error('Error transferring client:', error);
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
            'w-full flex items-center justify-center gap-2 px-4 py-3',
            'bg-cream text-burgundy-dark hover:bg-cream/90',
            ' font-medium transition-all duration-300',
            'hover:shadow-lg hover:shadow-cream/20'
          )}
        >
          <Send className="h-4 w-4" />
          Открыть форму
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white border-0">
        <DialogHeader>
          <DialogTitle className="text-burgundy-dark text-2xl font-serif">
            Передать клиента
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Заполните форму ниже, чтобы передать клиента в CRM систему
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-12 flex flex-col items-center">
            <div className="h-16 w-16 bg-green-100 flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-burgundy-dark mb-2">
              Успешно отправлено!
            </h3>
            <p className="text-sm text-muted-foreground text-center">
              Клиент передан в CRM систему. Мы свяжемся с ним в ближайшее время.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-burgundy-dark">
                ФИО клиента
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Иванов Иван Иванович"
                required
                className="border-burgundy/20 focus:border-burgundy h-11 "
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-burgundy-dark">
                Телефон
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                required
                className="border-burgundy/20 focus:border-burgundy h-11 "
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-burgundy-dark">
                Город
              </Label>
              <Input
                id="city"
                name="city"
                placeholder="Москва"
                required
                className="border-burgundy/20 focus:border-burgundy h-11 "
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-burgundy hover:bg-burgundy-dark text-white "
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Передать клиента
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
