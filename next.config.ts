import type { NextConfig } from "next";


const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sun*-*.userapi.com',
			},
		],
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						prettier: false,
						svgo: true,
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										override: {
											removeViewBox: false,
										},
									},
								},
							],
						},
						titleProp: true,
						ref: true,
					},
				},
			],
		});

		return config;
	},
};

export default nextConfig;
