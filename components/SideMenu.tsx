import { Button } from "@/components/ui/button"


const SideMenu = () => {
  return (
    <div className="h-screen w-[300px] bg-gray-200 flex justify-center">
      <div className="w-full flex flex-col items-center justify-between">
        <div>
          <div className="bg-muted-foreground w-52 h-24 mt-10">

          </div>
          <div className="mt-10 space-y-5">
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-muted-foreground"></div>
                <span className="ml-3">Panel</span>
              </li>

              <li className="flex items-center">
                <div className="w-6 h-6 bg-muted-foreground"></div>
                <span className="ml-3">Kalendarz</span>
              </li>

              <li className="flex items-center">
                <div className="w-6 h-6 bg-muted-foreground"></div>
                <span className="ml-3">Mój kurs</span>
              </li>

              <li className="flex items-center ">
                <div className="w-6 h-6 bg-muted-foreground"></div>
                <span className="ml-3">Mój profil</span>
              </li>
            </ul>
            <Button className="font-bold">OPŁAĆ KURS</Button>
          </div>
        </div>
        <div className="w-[218px] h-[241px] font-bold bg-muted-foreground mb-20 flex items-end justify-center">
          <h1>BANER REKLAMOWY</h1>
        </div>
      </div>
    </div>
  )
}

export default SideMenu