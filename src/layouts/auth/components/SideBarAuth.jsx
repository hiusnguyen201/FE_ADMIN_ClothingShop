export default function SidebarAuth() {
  return (
    <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
      <div className="absolute inset-0 bg-zinc-900"></div>
      <div className="w-1/4 relative z-20 flex items-center text-lg font-medium">
        <img
          src="/clothes-svgrepo-com.svg"
          className="bg-white w-6 h-6 mr-2 "
        />
        logo
      </div>
      <div className="relative z-20 mt-auto">
        <blockquote className="space-y-2">
          <p className="text-lg">
            Chào mừng bạn đến với trang wep của chúng tôi
          </p>
          <footer className="text-sm">Vuongbui</footer>
        </blockquote>
      </div>
    </div>
  );
}
