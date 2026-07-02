import { motion } from "framer-motion";
import {Brain,Bug,Network, FolderGit2,TrendingUp} from "lucide-react";
import {ResponsiveContainer,AreaChart,Area} from "recharts";
import { analyticsCards } from "./analyticsData";

const icons = {
    brain: Brain,
    bug: Bug,
    network: Network,
    folder: FolderGit2
};

export default function KPICards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

            {analyticsCards.map((card, index) => {

                const Icon = icons[card.icon as keyof typeof icons];

                return (

                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.1
                        }}
                        whileHover={{
                            y: -4
                        }}
                        className="rounded-2xl border border-[#30363D] bg-[#161B22] p-6 transition-all duration-300 hover:border-[#2EA043]/40"
                    >

                        <div className="flex justify-between items-center">

                            <div className="space-y-1">

                                <p className="text-xs font-medium text-muted-foreground mb-1">

                                    {card.title}

                                </p>

                                <h2 className="text-2xl font-bold font-mono tracking-tight">

                                    {card.value}

                                </h2>

                            </div>

                            <div
                                className="rounded-xl p-3"
                                style={{
                                    background: `${card.color}20`
                                }}
                            >

                                <Icon
                                    size={22}
                                    color={card.color}
                                />

                            </div>

                        </div>

                        <div className="mt-5 flex items-center gap-2">

                            <TrendingUp
                                size={14}
                                className="text-[#2EA043]"
                            />

                            <span className="text-sm font-semibold text-[#2EA043]">

                                {card.change}

                            </span>

                            <span className="text-xs text-gray-500">

                                this month

                            </span>

                        </div>

                        <div className="h-16 mt-4">

                            <ResponsiveContainer>

                                <AreaChart data={card.data}>

                                    <Area
                                        dataKey="value"
                                        stroke={card.color}
                                        fill={card.color}
                                        fillOpacity={0.15}
                                        strokeWidth={3}
                                    />

                                </AreaChart>

                            </ResponsiveContainer>

                        </div>

                    </motion.div>

                );

            })}

        </div>
    );
}