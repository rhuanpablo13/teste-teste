import { createContext, useState, useContext } from 'react';
import { Bug, Warning, TelegramLogo, Check, Info } from 'phosphor-react';

const container =
  'absolute animate-bounce min-w-[24rem] top-2 right-0 block flex p-4 mb-4 text-sm rounded-lg items-center gap-2 z-[70] ';

export interface ToastContextData {
  renderToast: (e: ToastState) => void;
}

export interface ToastState {
  type: 'success' | 'failure' | 'warning' | 'info';
  message: string;
  title?: string;
  open: boolean;
}

interface Props {
  children: JSX.Element;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider = ({ children }: Props) => {
  const [isShow, setIsShow] = useState<string>('hidden');
  const [icon, setIcon] = useState<any>();
  const [color, setColor] = useState<string>('');

  const [alertInfo, setAlertInfo] = useState<ToastState>({
    type: 'info',
    title: '',
    message: '',
    open: false
  });

  const renderType = (type: any): void => {
    switch (type) {
      case 'success':
        setIcon(<Check size={32} />);
        break;
      case 'failure':
        setIcon(<Bug size={32} />);
        break;
      case 'warning':
        setIcon(<Warning size={32} />);
        break;
      case 'info':
        setIcon(<TelegramLogo size={32} />);
        break;
      default:
        setIcon(<Info size={32} />);
        break;
    }
  };

  const renderColor = (type: any): void => {
    switch (type) {
      case 'success':
        setColor(
          'text-green-700 bg-green-100 rounded-lg  w-24 dark:bg-green-200 dark:text-green-800'
        );
        break;
      case 'failure':
        setColor(
          'text-red-700 bg-red-100 rounded-lg  w-24 dark:bg-red-200 dark:text-red-800'
        );
        break;
      case 'warning':
        setColor(
          'text-yellow-700 bg-yellow-100 rounded-lg  w-24 dark:bg-yellow-200 dark:text-yellow-800'
        );
        break;
      case 'info':
        setColor(
          'text-blue-700 bg-blue-100 rounded-lg  w-24 dark:bg-blue-200 dark:text-blue-800'
        );
        break;
      default:
        setColor(
          'text-gray-700 bg-gray-100 rounded-lg  w-24 dark:bg-gray-700 dark:text-gray-300'
        );
        break;
    }
  };

  const renderToast = ({ type, message, title, open }: ToastState) => {
    renderType(type);
    renderColor(type);

    setAlertInfo({
      type,
      message,
      title,
      open
    });

    const _open = open ? 'block' : 'hidden';
    setIsShow(_open);
    setTimeout(() => {
      setIsShow('hidden');
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ renderToast }}>
      <>
        {children}
        <div className={`${container} ${isShow} ${color}`} role="alert">
          {icon}
          <span>
            <span className="font-medium">{'   ' + alertInfo.title}</span>
            {' ' + alertInfo.message}
          </span>
        </div>
      </>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const context = useContext(ToastContext);
  return context;
}
