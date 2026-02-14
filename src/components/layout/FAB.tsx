import { useNavigate } from 'react-router-dom';

export default function FAB() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-24 right-6 z-20">
      <button
        onClick={() => navigate('/brew/new')}
        className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform group"
      >
        <span className="material-icons text-white text-2xl group-hover:rotate-45 transition-transform duration-300">
          add
        </span>
      </button>
    </div>
  );
}
