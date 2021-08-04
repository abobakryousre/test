import Swal from 'sweetalert2';

export const sweetAlert = (icon: any, title: any, text: any) => {
  Swal.fire({
    title,
    icon,
    text,
  });
};
