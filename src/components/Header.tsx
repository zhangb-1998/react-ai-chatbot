export const Header = () => {
  return (
    <header className="bg-emerald-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">AI智能客服</h1>
        <div className="flex items-center space-x-2">
          <span className="h-3 w-3 bg-green-400 rounded-full animate-pulse"></span>
          <span>在线</span>
        </div>
      </div>
    </header>
  );
};