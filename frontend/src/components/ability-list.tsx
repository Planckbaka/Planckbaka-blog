"use client"

import ScrollStack from "@/components/ScrollStack";

function FeatureList() {
    const features = [
        { title: "快速", desc: "极快的加载速度" },
        { title: "安全", desc: "企业级安全保障" },
        { title: "可靠", desc: "99.9%的正常运行时间" }
    ];

    return (
        <ScrollStack

            className="space-y-8"
        >
            {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        <p className="text-gray-600">{feature.desc}</p>
                    </div>
                </div>
            ))}
        </ScrollStack>
    );
}
export default FeatureList