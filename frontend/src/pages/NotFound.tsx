const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <img src="/error-icon.png" alt="404" className="mx-auto mb-4" />
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">The page you're looking for doesn't exist.</p>
      </div>
    </div>
  );
};

export default NotFound;