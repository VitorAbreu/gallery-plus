// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(
  func: T, // função que queremos executar
  wait: number // depois de quanto tempo essa função deve executar
) {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  // retorna uma nova função
  return function (...args: Parameters<T>): void {
    // aqui é onde executa a função parametrizada
    const later = () => {
      timeout = null;
      func(...args);
    };

    // controle que reinicia o timeout após evento chamar a função novamente
    if (timeout != null) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait); // tempo acabou executa a função later
  };
}
