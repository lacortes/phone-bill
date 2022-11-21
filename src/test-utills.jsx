import { render } from '@testing-library/react';

import ApiProvider from './providers/ApiProvider';

const customRender = (ui, options) => 
    render(ui, { wrapper: ApiProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };