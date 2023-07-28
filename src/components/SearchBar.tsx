'use client'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/Command';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Prisma, Subreddit } from '@prisma/client';
import { usePathname, useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';
import debounce from 'lodash.debounce';

interface SearchBarProps {
  
}



const SearchBar: FC<SearchBarProps> = ({}) => {

  const [input, setInput] = useState<string>('');
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput('');
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {data: queryRes, refetch, isFetching, isFetched} = useQuery({
    queryFn:async () => {
      if(!input){
        return [];
      }
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType
      })[]
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput('');
  }, [pathname]);

  return (
    <Command className="relative rounded-lg border max-w-lg z-50 overflow-visible">
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search Groups Here!"
      />    
      {input.length > 0 ? (
        <CommandList className='absolute bg-white top-full inset-x-0 shadow rounded-b-md'>
          {isFetched && <CommandEmpty>No result found</CommandEmpty>}
          {(queryRes?.length ?? 0) > 0 ? (
            <CommandGroup heading="Groups">
              {queryRes?.map((subreddit) => (
                <CommandItem
                onSelect={(e) => {
                  router.push(`/r/${e}`);
                  router.refresh();
                }}
                key={subreddit.id}
                value={subreddit.name}>
                <User className='mr-2 h-4 w-4'/>
                <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      ) : null}
    </Command>
  )
}

export default SearchBar;