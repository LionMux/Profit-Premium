import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Контакты и реквизиты</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Юридическая информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="font-medium">Наименование:</span> ООО &quot;Профит Премиум&quot;
            </p>
            <p>
              <span className="font-medium">ИНН:</span> 7701234567
            </p>
            <p>
              <span className="font-medium">КПП:</span> 770101001
            </p>
            <p>
              <span className="font-medium">ОГРН:</span> 1157746123456
            </p>
            <p>
              <span className="font-medium">Юридический адрес:</span> г. Москва, ул. Примерная, д.
              123, офис 456
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Контактная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="font-medium">Телефон:</span> +7 (999) 123-45-67
            </p>
            <p>
              <span className="font-medium">Email:</span> info@profit-premium.ru
            </p>
            <p>
              <span className="font-medium">Режим работы:</span> Пн-Пт с 9:00 до 18:00
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Банковские реквизиты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="font-medium">Банк:</span> ПАО СБЕРБАНК РОССИИ, г. Москва
            </p>
            <p>
              <span className="font-medium">Расчетный счет:</span> 40702810100000001234
            </p>
            <p>
              <span className="font-medium">Корреспондентский счет:</span> 30101810400000000225
            </p>
            <p>
              <span className="font-medium">БИК:</span> 044525225
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
