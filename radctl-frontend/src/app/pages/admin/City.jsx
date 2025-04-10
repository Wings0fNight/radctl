import React, { useMemo } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { importCity } from '../../components/admin/city/ImportCity';
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';


const City = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const fetchData = async () => {
      try {
        const response = await importCity(userData.token, { signal: controller.signal });
        if (response.data.auth === true) {
          setCities(response.data.res || []);
        } else {
          localStorage.clear();
          navigate('/auth');
        }
      } catch (error) {
        setError(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [navigate]);

  const columns = useMemo(() => [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "name", header: "NAME" },
    { accessorKey: "short_name", header: "SHORT NAME" },
  ], []);

  const table = useReactTable({
    data: cities,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='relative w-[99%] h-screen max-h-[91%] p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md mb-10 mt-10 m-auto'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default City;