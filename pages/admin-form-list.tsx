"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, Title, Text } from "@tremor/react";
import Search from "@/components/shared/search";
import UsersTable from "@/components/shared/table";
import type { User } from "@/components/shared/table";
import Loading from "@/components/shared/loading";

export default function AdminFormList() {
  const params = useSearchParams();
  const q = params?.get("q");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const paramStr = q
      ? `?${new URLSearchParams({
          email: q,
        }).toString()}`
      : "";
    setLoading(true);
    fetch(`/api/list/admin${paramStr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.status === 200) {
          const { data } = await res.json();
          setUsers(data);
        } else {
          const { error } = await res.json();
        }
      })
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <Title className="text-3xl font-normal text-gray-700">Users</Title>
      <Text className="text-sm font-normal text-gray-500">
        A list of users retrieved from a PostgreSQL database.
      </Text>
      <Search />
      <Card className="mt-6 p-0 pb-6 pt-6 ring-0">
        {loading ? <Loading /> : <UsersTable users={users} />}
      </Card>
    </div>
  );
}
