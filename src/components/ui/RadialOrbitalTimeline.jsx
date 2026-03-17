import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Link, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function RadialOrbitalTimeline({ timelineData }) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = e => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const getRelatedItems = itemId => {
    const currentItem = timelineData.find(item => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const centerViewOnNode = nodeId => {
    const nodeIndex = timelineData.findIndex(item => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const toggleItem = id => {
    setExpandedItems(prev => {
      const newState = { ...prev };
      Object.keys(newState).forEach(key => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach(relId => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle(prev => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 160;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)),
    );

    return { x, y, angle, zIndex, opacity };
  };

  const isRelatedToActive = itemId => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = status => {
    switch (status) {
      case 'completed':
        return 'text-white bg-green-600 border-green-400';
      case 'in-progress':
        return 'text-green-900 bg-green-100 border-green-300';
      case 'pending':
        return 'text-zinc-300 bg-zinc-800/60 border-zinc-600';
      default:
        return 'text-zinc-300 bg-zinc-800/60 border-zinc-600';
    }
  };

  return (
    <div
      className='w-full aspect-square max-w-[420px] flex items-center justify-center relative overflow-visible'
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className='relative w-full h-full flex items-center justify-center'>
        <div
          className='absolute w-full h-full flex items-center justify-center'
          ref={orbitRef}
          style={{
            perspective: '1000px',
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Centro pulsante */}
          <div className='absolute w-14 h-14 rounded-full bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 animate-pulse flex items-center justify-center z-10'>
            <div className='absolute w-18 h-18 rounded-full border border-green-400/20 animate-ping opacity-70' />
            <div
              className='absolute w-22 h-22 rounded-full border border-green-400/10 animate-ping opacity-50'
              style={{ animationDelay: '0.5s' }}
            />
            <div className='w-7 h-7 rounded-full bg-white/80 backdrop-blur-md' />
          </div>

          {/* Órbita circular */}
          <div className='absolute w-80 h-80 rounded-full border border-zinc-300/20 dark:border-white/10' />

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={el => (nodeRefs.current[item.id] = el)}
                className='absolute transition-all duration-700 cursor-pointer'
                style={nodeStyle}
                onClick={e => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Energy glow */}
                <div
                  className={cn(
                    'absolute rounded-full -inset-1',
                    isPulsing && 'animate-pulse',
                  )}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(22,163,74,0.25) 0%, rgba(22,163,74,0) 70%)',
                    width: `${item.energy * 0.4 + 36}px`,
                    height: `${item.energy * 0.4 + 36}px`,
                    left: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                    top: `-${(item.energy * 0.4 + 36 - 36) / 2}px`,
                  }}
                />

                {/* Node circle */}
                <div
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                    isExpanded
                      ? 'bg-green-600 text-white border-green-400 shadow-lg shadow-green-500/30 scale-150'
                      : isRelated
                        ? 'bg-green-500/50 text-white border-green-400 animate-pulse'
                        : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-600',
                  )}
                >
                  <Icon size={14} />
                </div>

                {/* Label */}
                <div
                  className={cn(
                    'absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold tracking-wider transition-all duration-300',
                    isExpanded
                      ? 'text-green-600 dark:text-green-400 scale-110'
                      : 'text-zinc-500 dark:text-zinc-400',
                  )}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <Card className='absolute top-18 left-1/2 -translate-x-1/2 w-60 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-green-200 dark:border-green-800/40 shadow-xl shadow-green-500/10 overflow-visible'>
                    <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-green-400/50' />
                    <CardHeader className='pb-2 p-4'>
                      <div className='flex justify-between items-center'>
                        <Badge
                          className={cn(
                            'px-2 text-[10px]',
                            getStatusStyles(item.status),
                          )}
                        >
                          {item.status === 'completed'
                            ? 'CONCLUÍDO'
                            : item.status === 'in-progress'
                              ? 'EM PROGRESSO'
                              : 'PENDENTE'}
                        </Badge>
                        <span className='text-[10px] font-mono text-zinc-400'>
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className='text-xs mt-2 text-zinc-900 dark:text-zinc-100'>
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='text-[11px] text-zinc-600 dark:text-zinc-300 p-4 pt-0'>
                      <p>{item.content}</p>

                      <div className='mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-700'>
                        <div className='flex justify-between items-center text-[10px] mb-1'>
                          <span className='flex items-center text-zinc-500'>
                            <Zap size={9} className='mr-1' />
                            Progresso
                          </span>
                          <span className='font-mono text-green-600 dark:text-green-400'>
                            {item.energy}%
                          </span>
                        </div>
                        <div className='w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full'
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className='mt-3 pt-2 border-t border-zinc-200 dark:border-zinc-700'>
                          <div className='flex items-center mb-1.5'>
                            <Link size={9} className='text-zinc-400 mr-1' />
                            <h4 className='text-[10px] uppercase tracking-wider font-medium text-zinc-400'>
                              Relacionados
                            </h4>
                          </div>
                          <div className='flex flex-wrap gap-1'>
                            {item.relatedIds.map(relatedId => {
                              const relatedItem = timelineData.find(
                                i => i.id === relatedId,
                              );
                              return (
                                <button
                                  key={relatedId}
                                  className='flex items-center h-5 px-2 py-0 text-[10px] border border-zinc-300 dark:border-zinc-600 bg-transparent hover:bg-green-50 dark:hover:bg-green-900/20 text-zinc-600 dark:text-zinc-300 hover:text-green-600 dark:hover:text-green-400 transition-all rounded-sm'
                                  onClick={e => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={7}
                                    className='ml-1 opacity-60'
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
