import AutoSizerExample from '@/components/ReactVitualized/AutoSizer';
import GridExample from '@/components/ReactVitualized/Grid3';
import ListApp from '@/components/ReactVitualized/List2';
import MasonryExample from '@/components/ReactVitualized/Masonry';
import MultiGridExample from '@/components/ReactVitualized/MultiGrid';
import ScrollSyncExample from '@/components/ReactVitualized/ScrollSync';
import WindowScrollerExample from '@/components/ReactVitualized/WindowScroller2';
import Window from '@/contents/Virtualization';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function VirtualizedPage() {
  const [open, setOpen] = useState();

  return (
    <div className="">
      {/* <ListApp /> */}
      {/* <GridExample /> */}
      {/* <AutoSizerExample /> */}
      {/* <WindowScrollerExample /> */}
      {/* <GridExample /> */}
      {/* <ScrollSyncExample /> */}
      {/* <MultiGridExample /> */}
      {/* <MasonryExample /> */}
      <Window rowHeight={60}>
        {new Array(1000)
          .fill({})
          .map((_, index) => ({ id: index }))
          .map((it) => (
            <li className="bg-slate-200" key={it.id}>
              {it.id}
              <button
                onClick={() =>
                  setOpen((p) => ({ ...p, [it.id]: !open?.[it.id] }))
                }
              >
                toggle
              </button>
              {!!open?.[it.id] && (
                <div className=''>
                  <div>abc abc abc abc abc abc abc abc abc</div>
                  <div>abc abc abc abc abc abc abc abc abc</div>
                </div>
              )}
            </li>
          ))}
      </Window>
    </div>
  );
}
