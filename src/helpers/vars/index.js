/**
 * Export
 */
export function getAlertType(index) {
  // success, info, warning, error of elements-ui component
  const alertType = ['success', 'info', 'warning', 'error', 'http'];
  return alertType[index];
}
