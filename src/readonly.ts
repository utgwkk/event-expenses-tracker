const _isReadonly = location.hash.length > 0;

export const isReadonly = () => _isReadonly;
