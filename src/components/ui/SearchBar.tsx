interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors material-icons text-xl">
        search
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-bg-light dark:bg-bg-dark rounded-xl border-none focus:ring-2 focus:ring-primary/50 text-sm placeholder-text-muted/70 font-medium shadow-sm text-neutral-dark dark:text-white outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
