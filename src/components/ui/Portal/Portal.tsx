import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const portalClassName = 'portal';

export type PortalProps = {
  children?: React.ReactNode;
};

const Portal: React.FC<PortalProps> = ({ children }: PortalProps) => {
  const [container] = React.useState(() => {
    const element = document.createElement('div');
    element.classList.add(portalClassName);
    return element;
  });

  React.useEffect(() => {
    document.body.appendChild(container);
    return (): void => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
