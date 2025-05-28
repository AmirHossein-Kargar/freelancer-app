export default function Table({ children }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {children}
      </table>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }) {
  return (
    <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
      {children}
    </tr>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
