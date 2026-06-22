import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0e6] via-[#faf8f5] to-[#f0e6ff] text-gray-800 flex flex-col relative overflow-hidden font-sans">
      
      {/* Background blur blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-violet-200/40 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-[#f5f0e6]/60 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-extrabold text-2xl tracking-tight">
              EMS
            </span>
          </div>
          <div>
            <button
              onClick={handleLoginRedirect}
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow-md hover:shadow-violet-200/50 hover:shadow-lg transition-all hover:-translate-y-0.5 duration-200 cursor-pointer text-sm"
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Content */}
      <main className="flex-grow flex flex-col justify-center items-center px-6 sm:px-8 py-16 relative z-10">
        
        {/* Hero Section */}
        <section className="max-w-4xl text-center flex flex-col items-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Employee{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Management System
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
            A system to manage employee attendance, leave requests, and payroll records in an organized way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={handleRegisterRedirect}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-violet-200/50 hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 cursor-pointer"
            >
              CREATE AN ACCOUNT
            </button>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Attendance */}
          <div 
            onClick={handleLoginRedirect}
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Attendance Tracking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track employee check-in and check-out times and maintain daily attendance records.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform">
              <span>View Attendance</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Card 2: Leave Management */}
          <div 
            onClick={handleLoginRedirect}
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Leave Management</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Employees can submit leave requests and view their approval status.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform">
              <span>View Leaves</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Card 3: Payroll */}
          <div 
            onClick={handleLoginRedirect}
            className="bg-white/60 hover:bg-white/80 backdrop-blur-sm border border-white/50 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payroll Portal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                View employee salary details and monthly payroll records.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:translate-x-1 transition-transform">
              <span>View Payroll</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white/20 border-t border-white/10 mt-16 relative z-10 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} EMS System. All rights reserved.</p>
      </footer>
    </div>
  );
}
