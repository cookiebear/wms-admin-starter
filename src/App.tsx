import {useCallback,useEffect,useState} from 'react';
import {Navigate,Route,Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Notice} from './components/UI';
import {Dashboard,type Ctx} from './pages/Dashboard';
import {Operations,Settings} from './pages/Operations';
import {readDB} from './lib/mockApi';
import type {DB} from './data/types';
// Routes live inside the layout via an Outlet context bridge.
import {Outlet} from 'react-router-dom';
function Shell({db,client,setClient,warehouse,setWarehouse,refresh,notify}:{db:DB;client:string;setClient:(v:string)=>void;warehouse:string;setWarehouse:(v:string)=>void;refresh:()=>void;notify:(v:string)=>void}){return <Routes><Route element={<Layout db={db} client={client} setClient={setClient} warehouse={warehouse} setWarehouse={setWarehouse}/>}><Route path="/" element={<Bridge ctx={{db,client,warehouse,refresh,notify}}/>}><Route index element={<Dashboard/>}/><Route path="products" element={<Operations kind="products"/>}/><Route path="inbound" element={<Operations kind="inbound"/>}/><Route path="inventory" element={<Operations kind="inventory"/>}/><Route path="outbound" element={<Operations kind="outbound"/>}/><Route path="returns" element={<Operations kind="returns"/>}/><Route path="settings" element={<Settings/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes>}
function Bridge({ctx}:{ctx:Ctx}){return <Outlet context={ctx}/>}
export default function App(){const [db,setDB]=useState<DB>(()=>readDB());const [client,setClient]=useState('all');const [warehouse,setWarehouse]=useState('all');const [message,setMessage]=useState('');const refresh=useCallback(()=>setDB(readDB()),[]);useEffect(()=>{window.addEventListener('wms:update',refresh);return ()=>window.removeEventListener('wms:update',refresh)},[refresh]);return <><Shell db={db} client={client} setClient={setClient} warehouse={warehouse} setWarehouse={setWarehouse} refresh={refresh} notify={setMessage}/>{message&&<Notice message={message} onClose={()=>setMessage('')}/>}</>}
