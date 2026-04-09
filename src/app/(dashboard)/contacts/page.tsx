import { Separator } from '@/components/ui/separator';
import { Building2, Phone, Mail, MapPin, Clock, CreditCard, Landmark } from 'lucide-react';

export default function ContactsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-cream">Контакты и реквизиты</h1>
        <p className="text-sm text-cream/60 mt-2">
          Юридическая информация и контактные данные компании
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Legal Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-cream">Юридическая информация</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">Наименование</span>
              <span className="text-sm font-medium text-cream text-right">ООО &quot;Профит Премиум&quot;</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">ИНН</span>
              <span className="text-sm font-medium text-cream">7701234567</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">КПП</span>
              <span className="text-sm font-medium text-cream">770101001</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">ОГРН</span>
              <span className="text-sm font-medium text-cream">1157746123456</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">Юридический адрес</span>
              <span className="text-sm font-medium text-cream text-right max-w-[200px]">
                г. Москва, ул. Примерная, д. 123, офис 456
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-cream">Контактная информация</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-cream/80" />
              </div>
              <div>
                <p className="text-xs text-cream/60">Телефон</p>
                <a 
                  href="tel:+79991234567" 
                  className="text-sm font-medium text-cream hover:text-cream/80 transition-colors"
                >
                  +7 (999) 123-45-67
                </a>
              </div>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-cream/80" />
              </div>
              <div>
                <p className="text-xs text-cream/60">Email</p>
                <a 
                  href="mailto:info@profit-premium.ru" 
                  className="text-sm font-medium text-cream hover:text-cream/80 transition-colors"
                >
                  info@profit-premium.ru
                </a>
              </div>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-4 w-4 text-cream/80" />
              </div>
              <div>
                <p className="text-xs text-cream/60">Адрес</p>
                <p className="text-sm font-medium text-cream">
                  г. Москва, ул. Примерная, д. 123, офис 456
                </p>
              </div>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-cream/80" />
              </div>
              <div>
                <p className="text-xs text-cream/60">Режим работы</p>
                <p className="text-sm font-medium text-cream">Пн-Пт: 9:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bank Details */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center">
              <Landmark className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-cream">Банковские реквизиты</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">Банк</span>
              <span className="text-sm font-medium text-cream text-right max-w-[250px]">
                ПАО СБЕРБАНК РОССИИ, г. Москва
              </span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">Расчетный счет</span>
              <span className="text-sm font-medium text-cream">40702810100000001234</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">Корреспондентский счет</span>
              <span className="text-sm font-medium text-cream">30101810400000000225</span>
            </div>
            <Separator className="bg-white/10" />
            <div className="flex justify-between items-start">
              <span className="text-sm text-cream/60">БИК</span>
              <span className="text-sm font-medium text-cream">044525225</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-burgundy-light/50 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-cream">Дополнительно</h2>
          </div>
          
          <p className="text-sm text-cream/70 leading-relaxed">
            Если у вас есть вопросы по работе с личным кабинетом или необходима помощь 
            в передаче клиентов, пожалуйста, свяжитесь с нами по указанным контактам 
            или воспользуйтесь формой обратной связи в разделе &quot;Личный кабинет&quot;.
          </p>
        </div>
      </div>
    </div>
  );
}
