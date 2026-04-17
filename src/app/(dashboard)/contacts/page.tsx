import { Separator } from '@/components/ui/separator';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  CreditCard,
  Landmark,
  ExternalLink,
  FileText,
  Shield,
} from 'lucide-react';
import { AbstractSkyline } from '@/components/illustrations/BuildingIllustrations';

export default function ContactsPage() {
  const contactInfo = [
    {
      icon: Phone,
      label: 'Телефон',
      value: '+7 (999) 123-45-67',
      href: 'tel:+79991234567',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@profit-premium.ru',
      href: 'mailto:info@profit-premium.ru',
    },
    {
      icon: MapPin,
      label: 'Адрес',
      value: 'г. Москва, ул. Примерная, д. 123, офис 456',
    },
    {
      icon: Clock,
      label: 'Режим работы',
      value: 'Пн-Пт: 9:00 - 18:00',
    },
  ];

  const legalInfo = [
    { label: 'Наименование', value: 'ООО "Профит Премиум"' },
    { label: 'ИНН', value: '7701234567' },
    { label: 'КПП', value: '770101001' },
    { label: 'ОГРН', value: '1157746123456' },
    {
      label: 'Юридический адрес',
      value: 'г. Москва, ул. Примерная, д. 123, офис 456',
    },
  ];

  const bankDetails = [
    { label: 'Банк', value: 'ПАО СБЕРБАНК РОССИИ, г. Москва' },
    { label: 'Расчетный счет', value: '40702810100000001234' },
    { label: 'Корреспондентский счет', value: '30101810400000000225' },
    { label: 'БИК', value: '044525225' },
  ];

  return (
    <div className="min-h-[calc(100vh-200px)] relative">
      {/* Decorative Background */}
      <div className="absolute top-40 left-0 w-[400px] h-[400px] opacity-[0.06] pointer-events-none">
        <AbstractSkyline className="w-full h-full text-cream" />
      </div>

      {/* Header Section */}
      <section className="mb-10">
        <p className="text-cream/60 text-[10px] tracking-[0.3em] mb-3 uppercase">
          Юридическая информация
        </p>
        <h1 className="font-serif text-cream text-4xl lg:text-5xl font-semibold mb-3 uppercase tracking-wide leading-tight">
          Контакты и реквизиты
        </h1>
        <p className="text-cream/60 max-w-lg leading-relaxed">
          Полная юридическая информация о компании, контактные данные и банковские реквизиты.
        </p>
      </section>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legal Info Card */}
        <div className="bg-burgundy border border-white/10  p-6 lg:p-8 relative overflow-hidden group transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-cream font-semibold">
                Юридическая информация
              </h2>
              <p className="text-xs text-cream/50 uppercase tracking-wider">
                Реквизиты компании
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {legalInfo.map((item, index) => (
              <div key={item.label}>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-cream/50">{item.label}</span>
                  <span className="text-sm font-medium text-cream text-right max-w-[200px]">
                    {item.value}
                  </span>
                </div>
                {index < legalInfo.length - 1 && (
                  <Separator className="bg-white/10 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-burgundy border border-white/10  p-6 lg:p-8 relative overflow-hidden group transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-cream font-semibold">
                Контактная информация
              </h2>
              <p className="text-xs text-cream/50 uppercase tracking-wider">
                Свяжитесь с нами
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10  bg-cream/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-cream/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-cream/50 mb-0.5">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-cream hover:text-cream/80 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-cream">{item.value}</p>
                    )}
                  </div>
                </div>
                {index < contactInfo.length - 1 && (
                  <Separator className="bg-white/10 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bank Details Card */}
        <div className="bg-burgundy border border-white/10  p-6 lg:p-8 relative overflow-hidden group transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center">
              <Landmark className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-cream font-semibold">
                Банковские реквизиты
              </h2>
              <p className="text-xs text-cream/50 uppercase tracking-wider">
                Для оплаты услуг
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {bankDetails.map((item, index) => (
              <div key={item.label}>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-cream/50">{item.label}</span>
                  <span className="text-sm font-medium text-cream text-right max-w-[250px]">
                    {item.value}
                  </span>
                </div>
                {index < bankDetails.length - 1 && (
                  <Separator className="bg-white/10 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="bg-burgundy border border-white/10  p-6 lg:p-8 relative overflow-hidden group transition-all duration-500">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12  bg-burgundy-light/50 flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-cream font-semibold">
                Дополнительно
              </h2>
              <p className="text-xs text-cream/50 uppercase tracking-wider">
                Полезная информация
              </p>
            </div>
          </div>

          <div className="space-y-4 text-cream/70">
            <p className="text-sm leading-relaxed">
              Если у вас есть вопросы по работе с личным кабинетом или необходима помощь
              в передаче клиентов, пожалуйста, свяжитесь с нами по указанным контактам
              или воспользуйтесь формой обратной связи в разделе &quot;Личный кабинет&quot;.
            </p>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-cream/50 uppercase tracking-wider mb-3">
                Социальные сети
              </p>
              <div className="flex gap-3">
                {['Telegram', 'WhatsApp', 'VK'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-4 py-2 bg-cream/10  text-xs text-cream/70 hover:bg-cream/20 hover:text-cream transition-all duration-300"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-10 text-center">
        <p className="text-xs text-cream/40 tracking-[0.2em] uppercase">
          © 2024 ООО &quot;ПРОФИТ ПРЕМИУМ&quot;. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </p>
      </div>
    </div>
  );
}
