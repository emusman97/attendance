import DoneIcon from '@mui/icons-material/Done';
import Snackbar from '@mui/joy/Snackbar';
import { Container, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { differenceInHours, parse, startOfDay } from 'date-fns';
import { useRef, useState, type JSX } from 'react';
import { useForm, type FieldError, type SubmitHandler } from 'react-hook-form';
import { FAB, InputField, NavBreadcrumbs } from '../../components';
import { AppStrings, OfficeHoursTimeRegex } from '../../constants';
import { UserMockService } from '../../mockService';
import { safeParseNumber } from '../../utils';
import type { FormFields } from './types';

export function SettingsPage(): JSX.Element {
  const [successSnackbarShown, setSuccessSnackbarShown] = useState(false);
  const [officeHours] = useState(() => UserMockService.getOfficeHours());
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
    clearErrors,
  } = useForm<FormFields>({ defaultValues: officeHours });

  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const getHelperText = (forField: FieldError | undefined) => {
    if (forField === errors.startTime) {
      if (errors.startTime?.type === 'validate') {
        return errors.startTime.message;
      } else if (errors.startTime?.type === 'required') {
        return AppStrings.StartTimeEmpty;
      } else if (errors.startTime?.type === 'pattern') {
        return AppStrings.StartTimePatternError;
      }
    } else if (forField === errors.finishTime) {
      if (errors.finishTime?.type === 'validate') {
        return errors.finishTime.message;
      } else if (errors.finishTime?.type === 'required') {
        return AppStrings.FinishTimeEmpty;
      } else if (errors.finishTime?.type === 'pattern') {
        return AppStrings.FinishTimePatternError;
      }
    } else {
      if (errors.workingHours?.type === 'validate') {
        return errors.workingHours.message;
      } else if (errors.workingHours?.type === 'required') {
        return AppStrings.WorkingHoursEmpty;
      } else {
        return AppStrings.InvalidWorkingHours;
      }
    }

    return '';
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    clearErrors();

    const refDate = startOfDay(new Date());
    const startTime = parse(data.startTime, 'hh:mm a', refDate);
    const endTime = parse(data.finishTime, 'hh:mm a', refDate);
    const hours = safeParseNumber(data.workingHours);

    if (startTime >= endTime) {
      setError('startTime', {
        type: 'validate',
        message: AppStrings.InvalidStartTime,
      });
      return;
    } else if (endTime <= startTime) {
      setError('finishTime', {
        type: 'validate',
        message: AppStrings.InvalidFinishTime,
      });
      return;
    }

    if (differenceInHours(endTime, startTime) !== hours) {
      setError('workingHours', {
        type: 'validate',
        message: AppStrings.InconsistenWorkingHours,
      });
      return;
    }

    UserMockService.setOfficeHours(data);
    setSuccessSnackbarShown(true);
  };
  const handleSaveChanges = () => {
    submitBtnRef.current?.click();
  };
  const handleSnackbarClose = () => {
    setSuccessSnackbarShown(false);
  };

  return (
    <Stack flex={1}>
      <Container sx={{ flex: 1 }}>
        <NavBreadcrumbs />

        <Stack alignItems="flex-start">
          <Typography variant="h5" fontWeight={400}>
            {AppStrings.OfficeHours}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack mt={4} gap={1} width={300}>
              <InputField
                variant="standard"
                placeholder={AppStrings.StartTime}
                label={AppStrings.StartTime}
                error={!!errors.startTime}
                helperText={getHelperText(errors.startTime)}
                {...register('startTime', {
                  required: true,
                  pattern: OfficeHoursTimeRegex,
                })}
              />
              <InputField
                variant="standard"
                placeholder={AppStrings.FinishTime}
                label={AppStrings.FinishTime}
                error={!!errors.finishTime}
                helperText={getHelperText(errors.finishTime)}
                {...register('finishTime', {
                  required: true,
                  pattern: OfficeHoursTimeRegex,
                })}
              />
              <InputField
                variant="standard"
                placeholder={AppStrings.WorkingHourse}
                label={AppStrings.WorkingHourse}
                type="number"
                error={!!errors.workingHours}
                helperText={getHelperText(errors.workingHours)}
                {...register('workingHours', {
                  required: true,
                  min: 4,
                })}
              />
            </Stack>

            <button ref={submitBtnRef} hidden type="submit"></button>
          </form>
        </Stack>
      </Container>

      <FAB
        sx={{ alignSelf: 'flex-end', right: 25 }}
        onClick={handleSaveChanges}
        title={AppStrings.SaveChanges}
        RightIcon={<DoneIcon sx={{ ml: 1 }} />}
      />

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        color="success"
        variant="solid"
        open={successSnackbarShown}
        onClose={handleSnackbarClose}
      >
        {AppStrings.OfficeHoursUpdated}
      </Snackbar>
    </Stack>
  );
}
