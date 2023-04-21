import { selectLang } from '@ducks/configSlice';
import { useAppSelector } from '@ducks/hooks';
import { LoadingIndicator } from '@libs/kym-dls';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

type ModuleWrapperProps = {
  children: React.ReactNode;
  module: string;
};

const ModuleWrapper: React.FC<ModuleWrapperProps> = ({ children, module }) => {
  const locale = useAppSelector(selectLang);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    import(`./${module}/locale/${locale}.json`)
      .then((res) => {
        setMessages(res.default);
        setLoading(false);
      });
  }, []);

  return (
    <IntlProvider messages={messages} locale={locale}>
      {loading
        ? <LoadingIndicator />
        : children
      }
    </IntlProvider>
  );
};

export default ModuleWrapper;
