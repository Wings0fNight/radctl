import React, { useMemo, useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import { importUsers } from '../../components/admin/users/ImportRadUsers';
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { useReactTable, getCoreRowModel, flexRender, getFilteredRowModel, getSortedRowModel} from '@tanstack/react-table';
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import activSVG from '../../assets/circle-check.svg';
import inactivSVG from '../../assets/circle-minus.svg';
import arrowSVG from '../../assets/arrow-down-up.svg'
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { DialogClose } from '@radix-ui/react-dialog';


const RadUsers = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [users, setUsers ] = useState([]);
	const [actualFilter, setActualFilter] = useState('');
	const tableContainerRef = useRef(null);

	const columns = useMemo(() => [
		{ accessorKey: 'select', label: 'Select', header: ({table}) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		), cell : ({row}) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.getToggleSelectedHandler(!!value)} aria-label="Select row" />, 
		},
		{ accessorKey: 'id', label: 'ID', header: 'ID'},
		{ accessorKey: 'name', label: 'Name', header: ({column }) => {
			return (
				<button className="flex items-center gap-2 hover:text-primary transition-colors w-full uppercase" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
					Name
					<img src={arrowSVG} className='w-4'/>
				</button>
			)
		},cell: ({row}) => {
			const handleSave = async (e) => {
				e.preventDefault();
				const formData = new FormData(e.target);
				const updateData = {};
				Array.from(formData.entries()).forEach(([key, value]) => {
					updateData[key] = value;
				})
				try {
					const response = await XXXXXX(updateData, row.original.id);
					if (response.data.auth === true) {
						setUsers(response.data.res || []);
						toast.success("User updated successfully");
					} else {
						toast.error("User update failed");
					}
					
				} catch (error) {
				if (error.response?.status === 401) {
					// localStorage.clear();
					// navigate('/auth');
				}
				}
			}
			return (
				<Dialog>
					<DialogTrigger asChild>
						<button className="hover:text-primary transition-colors w-full" >{row.getValue('name')}</button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit user</DialogTitle>
							<DialogDescription>
								Проверь корректность перед сохранением :)
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleSave}>
							{Object.keys(row.original).map((key) => {
								// if (key === "select") return null;
								const lable = columns.find((column) => column.accessorKey === key).label;
								key === "select" ? null : (
									<div className="grid grid-cols-4 items-center gap-4">
										<label htmlFor={key} className="text-right ">{lable}</label>
										<input type="text" id={key} className="col-span-3" defaultValue={row.original[key]} />
									</div>
								)

								// const lable = columns.find((column) => column.accessorKey === key).label;
								// return (
								// 	<div className="grid grid-cols-4 items-center gap-4">
								// 		<label htmlFor={key} className="text-right ">{lable}</label>
								// 		<input type="text" id={key} className="col-span-3" defaultValue={row.original[key]} />
								// 	</div>
								// )
							})}
							<DialogFooter>
								<DialogClose asChild>
									<button type='button' className='btn btn-secondary p-2 bg-primary rounded-md' variant="secondary">Закрыть</button>
								</DialogClose>
								<button type="submit" className="btn btn-primary p-2 bg-green-600 rounded-md">Сохранить</button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			)
		}},
		{ accessorKey: 'email', label: 'E-mail', header: 'E-mail'},
		{ accessorKey: 'dt_lastlogin', label: 'Last login', header: 'Last login'},
		{ accessorKey: 'enabled', label: 'Enabled', header: 'Enabled', cell: ({row}) => {
			if (row.original.enabled === "True") {
				return (
					<div className="flex items-center gap-2">
						<img src={activSVG} className="w-4"/>
						<span>Enabled</span>
					</div>
				)
			} else {
				return (
					<div className="flex items-center gap-2">
						<img src={inactivSVG} className="w-4"/>
						<span>Disabled</span>
					</div>
				)
			}
		}},
	], []);
	const [columnFilters, setColumnFilters] = React.useState([])
	const [sorting, setSorting] = React.useState([{id: 'name', desc: false}])
	const [rowSelection, setRowSelection] = React.useState({})
	
	const filteredData = useMemo(() => {
		if (!actualFilter) return users;
		return users.filter(user => 
		user.name.toLowerCase().includes(actualFilter.toLowerCase())
		);
	}, [users, actualFilter]);

	const table = useReactTable({
		data: filteredData,
		columns,
		onColumnFiltersChange: setColumnFilters,
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnFilters,
			sorting,
			rowSelection,
		},
		autoResetColumnSizing: true,
	});

	const heightVirtualizer = useVirtualizer({
		count: users.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => 50,
		overscan: 10,
	  });
	const rowVirtualizer = useVirtualizer({
		count: table.getRowModel().rows.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => 50, 
		overscan: 10,
	});

	const totalHeight = rowVirtualizer.getTotalSize();
	const maxContainerHeight = window.innerHeight * 0.8;
	const containerHeight = Math.min(maxContainerHeight, totalHeight);

	useEffect(() => {
		const controller = new AbortController();
		const userData = JSON.parse(localStorage.getItem("userData"));
		const fetchData = async () => {
			try {
				const response = await importUsers(userData.token, { signal: controller.signal });
				if (response.data.auth === true) {
					setUsers(response.data.res || []);
				} else {
					localStorage.clear();
					navigate('/auth');
				}
			} catch (error) {
				if (error.name === 'AbortError') {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
		return () => controller.abort();
	}, [navigate]);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	

	return (
		<div className='relative w-[99%] h-screen max-h-[91%] p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-10 m-auto flex flex-col'>
			<div className='flex justify-between my-4'>
				<div className='grid grid-cols-3 mt-3'>
					<label htmlFor="" className='text-left ml-2 font-medium'>Поиск пользователя: </label>
					<input  
						type="text" 
						placeholder="username"
						value={(table.getColumn("name")?.getFilterValue() ) ?? ''}
						onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
						className="block px-0 w-full text-smbg-transparent border-0 border-b-2 appearance-none text-gray-900 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0peer" />
				</div>
				<div>
					<button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
						<span>Add user</span>
					</button>
				</div>			
			</div>
			<div ref={tableContainerRef} className='flex-1 overflow-auto' style={{ height: `${containerHeight}px`, overflowY: totalHeight > maxContainerHeight ? 'auto' : 'hidden'  }}>
				<Table className="w-full" style={{ height: `${heightVirtualizer.getTotalSize()}px` }}>
					<TableHeader className='sticky top-0 z-1 bg-gray-400 [&_tr:hover]:bg-gray-400'>
						{table.getHeaderGroups().map((headerGroup) => {
							const columnPercentages = ['5%', '10%', '25%', '30%', '20%', '10%'];
							return (
								<TableRow key={headerGroup.id} className='uppercase text-left' style={{ display: 'grid',gridTemplateColumns: columnPercentages.join(' ') }}>
									{headerGroup.headers.map((header, index) => (
									<TableHead key={header.id} className='pt-2' style={{ width: columnPercentages[index] }}>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
									))}
								</TableRow>
							)
						}
						)}
					</TableHeader>
					<TableBody className='text-left relative' style={{ height: `${heightVirtualizer.getTotalSize()}px` }}>
						{rowVirtualizer.getVirtualItems().map(virtualRow => {
						const row = table.getRowModel().rows[virtualRow.index];
						const columnPercentages = ['5%', '10%', '25%', '30%', '20%', '10%'];
						return (
							<TableRow
							key={row.id}
							className='w-full'
							style={{
								position: 'absolute',
								height: `${virtualRow.size}px`,
								transform: `translateY(${virtualRow.start}px)`,
								display: 'grid',
								gridTemplateColumns: columnPercentages.join(' '),
							}}
							>
							{row.getVisibleCells().map((cell, index) => (
								<TableCell key={cell.id} className='flex items-center' style={{ width: columnPercentages[index] }}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
							</TableRow>
						);
						})}
					</TableBody>
				</Table>
			</div>
			<div className='flex justify-between items-center mt-4 text-sm text-gray-600'>
				<div>
					Показано {rowVirtualizer.getVirtualItems().length} из {table.getRowModel().rows.length}
				</div>
				<div>
					Выделено {table.getSelectedRowModel().rows.length}
				</div>
			</div>
		</div>
	);

		// <div className='relative w-[99%] h-screen max-h-[91%] p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-10 m-auto'>
		// 	{isModalOpen && editUser && (
		// 		<div className="fixed inset-0 flex items-center justify-center z-50">
		// 		<div className="absolute inset-0 bg-gray-900 opacity-50"></div>
		// 		<div className="w-[40%] bg-gray-100 p-6 rounded-lg shadow-lg z-50">
		// 			<h2 className="text-2xl font-bold mb-4">Edit User</h2>
		// 			<div className='space-y-4'>
		// 			{[
		// 				{ field: 'radName', label: 'Username', editable: true },
		// 				{ field: 'email', label: 'E-mail', editable: true },
		// 				{ field: 'cityAD', label: 'City', editable: false },
		// 				{field: 'group', 
		// 					label: 'Group', 
		// 					editable: true, 
		// 					type: 'group', 
		// 					options: userGroups 
		// 				},
		// 				{field: 'activeUsers', 
		// 					label: 'Account Status', 
		// 					editable: true,
		// 					type: 'checkbox',
		// 					activeValue: 'Active',
		// 					inactiveValue: 'Inactive'
		// 				},
		// 				{field: 'activePass', 
		// 					label: 'Password Status', 
		// 					editable: true,
		// 					type: 'checkbox',
		// 					activeValue: 'Active',
		// 					inactiveValue: 'Inactive'
		// 				},
		// 				{field: 'dateActive', 
		// 					label: 'Date active',
		// 					editable: true,
		// 					type: 'datetime-local'
		// 				},
		// 			].map((item, index) => (
		// 				<div key={index} className='flex items-center gap-4'>
		// 					<label className="w-1/3 text-right text-sm font-medium text-gray-700">{item.label}</label>
		// 					{item.editable ? (
		// 					item.type === 'checkbox' ? (
		// 						<div className="w-2/3 flex items-center">
		// 							<label className="inline-flex items-center mr-4">
		// 								<Switch 
		// 								checked={editUser[item.field] === item.activeValue} 
		// 								onCheckedChange={(checked) => handleInputChange(item.field, checked ? item.activeValue : item.inactiveValue)}
		// 								className="mr-2"										/>
		// 								<span>{editUser[item.field] === item.activeValue ? 'Active' : 'Inactive'}</span>
		// 							</label>
		// 						</div>
		// 					) : item.type === 'group' ? (
		// 						<div className="w-2/3  flex flex-col relative overflow-x-auto h-[100px] border-2 border-gray-600 rounded">
		// 							{item.options.map((group) => (
		// 								<label key={group} className='pl-2 inline-flex items-center mr-4'>
		// 									<input
		// 										type='checkbox'
		// 										checked={editUser[item.field].includes(group)}
		// 										onChange={(e) => {
		// 											const isChecked = e.target.checked;
		// 											setEditUser(prev => ({
		// 												...prev,
		// 												[item.field]: isChecked
		// 												? [...prev[item.field], group]
		// 												: prev[item.field].filter(g => g !== group)
		// 											}));
		// 										}}
		// 									className="mr-2 w-4 h-4"
		// 									/>
		// 									<span>{group}</span>
		// 								</label>
		// 							))}
		// 						</div>
		// 					) : item.type === 'datetime-local' ? (
		// 						<input
		// 							type="datetime-local"
		// 							value={editUser[item.field]}
		// 							onChange={(e) => handleInputChange(item.field, e.target.value)}
		// 							className="pl-2 w-2/3 mt-1 border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
		// 						/>
		// 					) : (
		// 						<input
		// 							type="text"
		// 							value={editUser[item.field]}
		// 							onChange={(e) => handleInputChange(item.field, e.target.value)}
		// 							className="pl-2 w-2/3 mt-1 border-0 border-b-2 appearance-none border-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0 peer"
		// 						/>
		// 					)
		// 					) : (
		// 					<p className='pl-2 w-2/3 mt-1 border-0 border-b-2 appearance-none border-gray-600 text-left'>
		// 						{editUser[item.field]}
		// 					</p>
		// 					)}
		// 				</div>
		// 			))}
		// 			</div>

		// 			<div className="flex justify-end">
		// 				<button
		// 					onClick={handleModalClose}
		// 					className="px-4 py-2 mt-3 bg-gray-500 text-white rounded-md hover:bg-gray-600">
		// 					Закрыть
		// 				</button>
		// 				<button
		// 					onClick={handleSave}
		// 					className="px-4 py-2 mt-3 ml-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
		// 					Сохранить
		// 				</button>
		// 			</div>
		// 		</div>
		// 		</div>
		
};

export default RadUsers;