import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(date: Date) {
  return format(date, 'yyyy-MM-dd HH:mm a', {
    locale: ptBR,
  });
}
