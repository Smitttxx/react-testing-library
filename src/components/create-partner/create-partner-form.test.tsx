import React from 'react';

import { render, userEvent, waitFor } from '@shieldpay/wheeljack/testing';

import { CreatePartnerForm } from './create-partner-form';
import { CreatePartnerFormProps } from './types';

const mockProps: CreatePartnerFormProps = {
  onSubmit: jest.fn(),
};

afterEach(jest.resetAllMocks);
describe('<CreatePartnerForm />', () => {
  it('should render correctly on first render', async () => {
    const { findByLabelText, findByRole, queryAllByTestId } = render(
      <CreatePartnerForm {...mockProps} />,
    );

    expect(
      await findByLabelText('Registered business name'),
    ).toBeInTheDocument();
    expect(await findByLabelText('Business display name')).toBeInTheDocument();
    expect(await findByLabelText('Contact email')).toBeInTheDocument();
    expect(
      await findByRole('button', { name: 'Create partner' }),
    ).toBeInTheDocument();

    const validationMessages = queryAllByTestId('input-error');

    expect(validationMessages.length).toBe(0);
  });
});

describe('when starting from an empty state', () => {
  describe('when the user tries to submit the form immediately', () => {
    it('should block submission', async () => {
      const { findByRole } = render(<CreatePartnerForm {...mockProps} />);

      userEvent.click(await findByRole('button'));

      expect(mockProps.onSubmit).not.toBeCalled();
    });

    it('should display validation messaing', async () => {
      const { findByRole, queryAllByTestId } = render(
        <CreatePartnerForm {...mockProps} />,
      );

      userEvent.click(await findByRole('button'));

      const validationMessages = queryAllByTestId('input-error');

      expect(validationMessages.length).toBe(3);
    });

    describe('when the user completes the form with valid data', () => {
      const validEmail = 'totes@valid.com';
      const validBusinessName = 'The Bluth Company';
      const validBusinessDisplayName = 'BLU01';

      it('should not show validation messaging', async () => {
        const { queryAllByTestId, findByLabelText } = render(
          <CreatePartnerForm {...mockProps} />,
        );

        userEvent.paste(
          await findByLabelText('Registered business name'),
          validBusinessName,
        );
        userEvent.paste(
          await findByLabelText('Business display name'),
          validBusinessDisplayName,
        );
        userEvent.paste(await findByLabelText('Contact email'), validEmail);

        await waitFor(() => {
          expect(queryAllByTestId('input-error').length).toBe(0);
        });
      });

      it('should allow submission', async () => {
        const { findByRole, findByLabelText } = render(
          <CreatePartnerForm {...mockProps} />,
        );

        userEvent.paste(
          await findByLabelText('Registered business name'),
          validBusinessName,
        );
        userEvent.paste(
          await findByLabelText('Business display name'),
          validBusinessDisplayName,
        );
        userEvent.paste(await findByLabelText('Contact email'), validEmail);
        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).toBeCalled();
      });
    });
  });
  describe('when validating inputs', () => {
    describe('Registered Business Name', () => {
      const maxLength = 240;
      const lengthyBusinessName = Array(maxLength + 1)
        .fill('a')
        .join('');

      it('should be invalid when given a value which is too long', async () => {
        const {
          queryAllByTestId,
          findByLabelText,
          findByText,
          findByRole,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Registered business name');

        userEvent.paste(input, lengthyBusinessName);
        input.blur();

        expect(
          await findByText('Enter a valid registered business name'),
        ).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should be invalid when empty', async () => {
        const {
          queryAllByTestId,
          findByLabelText,
          findByText,
          findByRole,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Registered business name');

        userEvent.paste(input, 'huh');
        userEvent.clear(input);
        input.blur();

        expect(
          await findByText('Enter the registered business name'),
        ).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should not show validation if the input has not been blurred', async () => {
        const { queryAllByTestId, findByLabelText, findByRole } = render(
          <CreatePartnerForm {...mockProps} />,
        );
        const input = await findByLabelText('Registered business name');
        userEvent.paste(input, lengthyBusinessName);

        expect(queryAllByTestId('input-error').length).toBe(0);

        userEvent.clear(input);

        expect(queryAllByTestId('input-error').length).toBe(0);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });
    });

    describe('Business display name', () => {
      const maxLength = 70;
      const lengthyBusinessName = Array(maxLength + 1)
        .fill('a')
        .join('');

      it('should be invalid when given a value which is too long', async () => {
        const {
          queryAllByTestId,
          findByLabelText,
          findByText,
          findByRole,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Business display name');

        userEvent.paste(input, lengthyBusinessName);
        input.blur();

        expect(
          await findByText('Enter a valid business display name'),
        ).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should be invalid when empty', async () => {
        const {
          queryAllByTestId,
          findByLabelText,
          findByText,
          findByRole,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Business display name');

        userEvent.paste(input, 'huh');
        userEvent.clear(input);
        input.blur();

        expect(
          await findByText('Enter the business display name'),
        ).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should not show validation if the input has not been blurred', async () => {
        const { queryAllByTestId, findByLabelText, findByRole } = render(
          <CreatePartnerForm {...mockProps} />,
        );
        const input = await findByLabelText('Business display name');

        userEvent.paste(input, lengthyBusinessName);

        expect(queryAllByTestId('input-error').length).toBe(0);

        userEvent.clear(input);

        expect(queryAllByTestId('input-error').length).toBe(0);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });
    });

    describe('Contact email', () => {
      const badEmailAddress = 'stop.hammer.time';
      const maxLength = 240;
      const lengthyEmail = Array(maxLength + 1)
        .fill('a')
        .join('');

      it('should be invalid when given a value which is too long', async () => {
        const {
          queryAllByTestId,
          findByLabelText,
          findByText,
          findByRole,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Contact email');

        userEvent.paste(input, lengthyEmail);
        input.blur();

        expect(
          await findByText('Check email address format'),
        ).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should be invalid when given a value which is not a valid email address', async () => {
        const {
          findByLabelText,
          findByText,
          findByRole,
          queryAllByTestId,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Contact email');

        userEvent.type(input, badEmailAddress);
        input.blur();

        expect(
          await findByText('Check email address format'),
        ).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should be invalid when empty', async () => {
        const {
          findByLabelText,
          findByText,
          findByRole,
          queryAllByTestId,
        } = render(<CreatePartnerForm {...mockProps} />);
        const input = await findByLabelText('Contact email');

        userEvent.paste(input, 'huh');
        userEvent.clear(input);
        input.blur();

        expect(await findByText('Enter an email address')).toBeInTheDocument();
        expect(queryAllByTestId('input-error').length).toBe(1);

        userEvent.click(await findByRole('button'));

        expect(mockProps.onSubmit).not.toBeCalled();
      });

      it('should not show validation if the input has not been blurred', async () => {
        const { findByLabelText, queryAllByTestId } = render(
          <CreatePartnerForm {...mockProps} />,
        );
        const input = await findByLabelText('Contact email');

        userEvent.paste(input, badEmailAddress);

        expect(queryAllByTestId('input-error').length).toBe(0);

        userEvent.clear(input);

        await waitFor(() => {
          expect(queryAllByTestId('input-error').length).toBe(0);
        });
      });
    });
  });
});
