import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useOxin } from 'oxin';

import { Box, Button, TextInput } from '@shieldpay/bumblebee';
import {
  createMaxLength,
  required,
  validateEmailAddress,
} from '@shieldpay/shared/src/validators';

import { CreatePartnerFields, CreatePartnerFormProps } from './types';

/**
 * We want to exclude max length validation messaging from
 * displaying when a user clicks submit without having entered fields as
 * `required` validation should show only. So here we count an undefined value
 * as a passing candidate.
 * */
const lessThanMaxLengthTest = (maxLength: number) => (value: string): boolean =>
  value === undefined ? true : createMaxLength(maxLength)(value);

export const CreatePartnerForm = ({ onSubmit }: CreatePartnerFormProps) => {
  const { formatMessage } = useIntl();
  const { inputProps, inputState } = useOxin<CreatePartnerFields>();
  const [submitAttempted, updateSubmitAttempted] = useState(false);
  const [hasBlurredWhileInvalid, updateHasBlurredWhileInvalid] = useState<
    Record<keyof CreatePartnerFields, boolean>
  >({
    contactEmail: false,
    registeredBusinessName: false,
    businessDisplayName: false,
  });

  /**
   * A user should only see messaging when an input is blurred whilst
   * in an invalid state.
   *
   * We want to keep track of where a field is invalid when blurred
   * so that a user can blur in a valid state, then return to the
   * field and make it invalid, without seeing validation messages
   * until they blur the field again.
   */
  const switchBlurredWhenInvalid = (
    fieldName: keyof CreatePartnerFields,
    setHasBlurredWhileInvalid: boolean,
  ) => () => {
    const validationState = inputState.validation[fieldName]!;

    if (Object.values(validationState).some((state) => !state.valid)) {
      updateHasBlurredWhileInvalid((blurred) => ({
        ...blurred,
        [fieldName]: setHasBlurredWhileInvalid,
      }));
    }
  };

  const shouldDisplayValidation = (fieldName: keyof CreatePartnerFields) => {
    return (
      submitAttempted ||
      (inputState.touched[fieldName] && hasBlurredWhileInvalid[fieldName])
    );
  };

  const handleSubmit = () => {
    if (inputState.valid) {
      const { values } = inputState;
      onSubmit(values as CreatePartnerFields);
    } else {
      updateSubmitAttempted(true);
    }
  };

  return (
    <Box spacing="basePos5">
      <TextInput
        id="registered-business-name"
        label={
          <FormattedMessage id="paycast.createPartner.form.registeredBusinessName" />
        }
        {...inputProps({
          name: 'registeredBusinessName',
          validators: [
            [
              { name: 'required', test: required },
              formatMessage({
                id:
                  'paycast.createPartner.form.validation.registeredBusinessName.required',
              }),
            ],
            [
              {
                name: 'lessThanMaxLength',
                test: lessThanMaxLengthTest(240),
              },
              formatMessage({
                id:
                  'paycast.createPartner.form.validation.registeredBusinessName.validFormat',
              }),
            ],
          ],
        })}
        showValidation={shouldDisplayValidation('registeredBusinessName')}
        onBlur={switchBlurredWhenInvalid('registeredBusinessName', true)}
        onFocus={switchBlurredWhenInvalid('registeredBusinessName', false)}
      />
      <TextInput
        id="business-display-name"
        label={
          <FormattedMessage id="paycast.createPartner.form.businessDisplayName" />
        }
        {...inputProps({
          name: 'businessDisplayName',
          validators: [
            [
              { name: 'required', test: required },
              formatMessage({
                id:
                  'paycast.createPartner.form.validation.businessDisplayName.required',
              }),
            ],
            [
              {
                name: 'lessThanMaxLength',
                test: lessThanMaxLengthTest(70),
              },
              formatMessage({
                id:
                  'paycast.createPartner.form.validation.businessDisplayName.validFormat',
              }),
            ],
          ],
        })}
        showValidation={shouldDisplayValidation('businessDisplayName')}
        onBlur={switchBlurredWhenInvalid('businessDisplayName', true)}
        onFocus={switchBlurredWhenInvalid('businessDisplayName', false)}
      />
      <TextInput
        id="contact-email"
        label={<FormattedMessage id="paycast.partners.contactEmail" />}
        {...inputProps({
          name: 'contactEmail',
          validators: [
            [
              { name: 'required', test: required },
              formatMessage({
                id:
                  'paycast.createPartner.form.validation.contactEmail.required',
              }),
            ],
            [
              {
                name: 'emailFormat',
                test: (value: string) => {
                  if (value)
                    return (
                      validateEmailAddress(value) && createMaxLength(240)(value)
                    );
                  return true;
                },
              },
              formatMessage({
                id:
                  'paycast.createPartner.form.validation.contactEmail.validFormat',
              }),
            ],
          ],
        })}
        showValidation={shouldDisplayValidation('contactEmail')}
        onBlur={switchBlurredWhenInvalid('contactEmail', true)}
        onFocus={switchBlurredWhenInvalid('contactEmail', false)}
      />
      <Button onClick={handleSubmit}>
        <FormattedMessage id="paycast.createPartner.form.createPartnerButton" />
      </Button>
    </Box>
  );
};
