export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-background/50 dark:bg-background/75">
      <div
        className={`animate-spin rounded-full border-4 border-primary border-t-transparent w-12 h-12`}
      />
    </div>
  );
}
