import { useSelector } from 'react-redux';

const Overlay = () => {
  const isVisible = useSelector((state) => state.overlay.isVisible);

  return (
    <div
      className={`fixed inset-0 z-99 bg-black pointer-events-none transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-50' : 'opacity-0'
      }`}
    />
  );
};

export default Overlay;