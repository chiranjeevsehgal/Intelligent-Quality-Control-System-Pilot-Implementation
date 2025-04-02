import {
  Menu,
  FileText,
} from "lucide-react"

const Sidebar = ({ sidebarOpen, setSidebarOpen, currentPage }) => {
    
    
// Paths for the sidebar
  const sidebarItems = [
    { name: "Gemini Upload", icon: <FileText className="h-5 w-5" />, path: "/" },
    { name: "Ollama Upload", icon: <FileText className="h-5 w-5" />, path: "/ollama" },
    { name: "Cloud Processing", icon: <FileText className="h-5 w-5" />, path: "/cloudpipeline" },
    { name: "Edge Processing", icon: <FileText className="h-5 w-5" />, path: "/edgepipeline" }
  ]

    //   To toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // To check if the current item is active
  const isActive = (path) => {
    return currentPage === path
  }

  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col h-screen fixed left-0 top-0 z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className={`flex items-center ${!sidebarOpen && "justify-center w-full"}`}>
          <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="text-white font-bold">QM</span>
          </div>
          {sidebarOpen && <span className="ml-3 font-semibold text-gray-800">Quality Monitor</span>}
        </div>
        <button onClick={toggleSidebar} className={`text-gray-500 hover:text-gray-700 ${!sidebarOpen && "hidden"}`}>
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-3">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className={`flex items-center p-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors ${
                  isActive(item.path) ? "bg-blue-50 text-blue-700" : ""
                } ${!sidebarOpen && "justify-center"}`}
              >
                <span className={`${isActive(item.path) ? "text-blue-600" : "text-gray-500"}`}>{item.icon}</span>
                {sidebarOpen && <span className="ml-3">{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar