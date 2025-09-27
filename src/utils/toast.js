import toast from 'react-hot-toast';

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 2000,
    position: 'top-right',
    style: {
      background: '#10B981',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 2000,
    position: 'top-right',
    style: {
      background: '#EF4444',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

export const showLoading = (message) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#3B82F6',
      color: '#fff',
      fontWeight: '500',
    },
  });
};

export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};