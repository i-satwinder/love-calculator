<script lang="ts">
	import { onMount } from 'svelte';
	
	let name1 = $state('');
	let name2 = $state('');
	let result = $state<{ percentage: number; message: string } | null>(null);
	let isCalculating = $state(false);
	let showResult = $state(false);
	
	// Love calculation algorithm - consistent results for same names
	function calculateLove(name1: string, name2: string): number {
		if (!name1.trim() || !name2.trim()) return 0;
		
		// Convert names to lowercase and remove spaces
		const cleanName1 = name1.toLowerCase().replace(/\s/g, '');
		const cleanName2 = name2.toLowerCase().replace(/\s/g, '');
		
		// Calculate ASCII sum for both names
		let sum1 = 0;
		let sum2 = 0;
		
		for (let i = 0; i < cleanName1.length; i++) {
			sum1 += cleanName1.charCodeAt(i);
		}
		
		for (let i = 0; i < cleanName2.length; i++) {
			sum2 += cleanName2.charCodeAt(i);
		}
		
		// Combine sums and create consistent percentage
		const combined = sum1 + sum2;
		const percentage = (combined * 7 + cleanName1.length * cleanName2.length * 3) % 101;
		
		return Math.max(1, percentage); // Ensure at least 1%
	}
	
	function getLoveMessage(percentage: number): string {
		if (percentage >= 80) return "A match made in heaven ❤️🔥";
		if (percentage >= 60) return "Strong bond, lots of potential 💕";
		if (percentage >= 40) return "There's a spark, but needs effort ✨";
		if (percentage >= 20) return "Better as friends maybe 😅";
		return "Oops… maybe not meant to be 💔";
	}
	
	async function handleCalculate(): Promise<void> {
		if (!name1.trim() || !name2.trim()) {
			alert('Please enter both names!');
			return;
		}
		
		isCalculating = true;
		showResult = false;
		
		// Add delay for dramatic effect
		await new Promise(resolve => setTimeout(resolve, 2000));
		
		const percentage = calculateLove(name1, name2);
		const message = getLoveMessage(percentage);
		
		result = { percentage, message };
		isCalculating = false;
		showResult = true;
	}
	
	function shareResult(): void {
		if (!result) return;
		
		const text = `${name1} + ${name2} = ${result.percentage}% love compatibility! ${result.message}`;
		const url = window.location.href;
		
		if (navigator.share) {
			navigator.share({
				title: 'Love Calculator Result',
				text: text,
				url: url
			});
		} else {
			navigator.clipboard.writeText(`${text} - Try it yourself: ${url}`);
			alert('Result copied to clipboard!');
		}
	}
	
	function reset(): void {
		name1 = '';
		name2 = '';
		result = null;
		showResult = false;
		isCalculating = false;
	}
</script>

<svelte:head>
	<title>Love Calculator – Check Your Name Compatibility Online</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-red-100">
	<!-- Ad Space Top -->
	<div class="w-full h-20 bg-gray-100 border-b flex items-center justify-center text-gray-500 text-sm">
		<!-- Ad Space Top -->
		<div id="adsterra-top-banner">
			<script async="async" data-cfasync="false" src="//pl27434935.profitableratecpm.com/b69b2703918ded0a66b9da0f5f05a76b/invoke.js"></script>
			<div id="container-b69b2703918ded0a66b9da0f5f05a76b"></div>
		</div>
	</div>
	
	<div class="container mx-auto px-4 py-8 max-w-md">
		<!-- Header -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-pink-600 mb-2">💕 Love Calculator</h1>
			<p class="text-gray-600">Discover your name compatibility percentage!</p>
		</div>
		
		<!-- Input Form -->
		<div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
			<div class="space-y-4">
				<div>
					<label for="name1" class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
					<input
						id="name1"
						type="text"
						bind:value={name1}
						placeholder="Enter your name"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
						disabled={isCalculating}
					/>
				</div>
				
				<div class="text-center text-2xl">💖</div>
				
				<div>
					<label for="name2" class="block text-sm font-medium text-gray-700 mb-2">Partner's Name</label>
					<input
						id="name2"
						type="text"
						bind:value={name2}
						placeholder="Enter partner's name"
						class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
						disabled={isCalculating}
					/>
				</div>
				
				<button
					onclick={handleCalculate}
					disabled={isCalculating || !name1.trim() || !name2.trim()}
					class="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-pink-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
				>
					{#if isCalculating}
						<span class="flex items-center justify-center">
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							Calculating Love...
						</span>
					{:else}
						Calculate Love 💕
					{/if}
				</button>
			</div>
		</div>
		
		<!-- Result Display -->
		{#if showResult && result}
			<div class="bg-white rounded-2xl shadow-lg p-6 mb-6 transform transition-all duration-500 ease-in-out">
				<div class="text-center">
					<div class="mb-4">
						<div class="text-6xl font-bold text-pink-600 mb-2">{result.percentage}%</div>
						<div class="text-lg text-gray-700 mb-4">{result.message}</div>
					</div>
					
					<!-- Progress Bar -->
					<div class="w-full bg-gray-200 rounded-full h-4 mb-6">
						<div 
							class="bg-gradient-to-r from-pink-500 to-red-500 h-4 rounded-full transition-all duration-1000 ease-out"
							style="width: {result.percentage}%"
						></div>
					</div>
					
					<!-- Action Buttons -->
					<div class="flex gap-3">
						<button
							onclick={shareResult}
							class="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
						>
							Share Result 📱
						</button>
						<button
							onclick={reset}
							class="flex-1 bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
						>
							Try Again 🔄
						</button>
					</div>
				</div>
			</div>
		{/if}
		
		<!-- How it Works -->
		<div class="bg-white rounded-2xl shadow-lg p-6 mb-6">
			<h2 class="text-xl font-bold text-gray-800 mb-3">How it Works</h2>
			<p class="text-gray-600 text-sm leading-relaxed">
				Our love calculator uses a special algorithm based on the letters in your names to calculate compatibility. 
				The same names will always give the same result, making it fun and consistent!
			</p>
		</div>
		
		<!-- Social Share -->
		<div class="text-center">
			<p class="text-gray-600 text-sm mb-4">Share with friends:</p>
			<div class="flex justify-center gap-4">
				<button
					onclick={() => window.open(`https://wa.me/?text=Check your love compatibility at ${window.location.href}`, '_blank')}
					class="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
				>
					📱
				</button>
				<button
					onclick={() => window.open(`https://twitter.com/intent/tweet?text=Just tried this fun love calculator!&url=${window.location.href}`, '_blank')}
					class="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors"
				>
					🐦
				</button>
				<button
					onclick={() => navigator.clipboard.writeText(window.location.href)}
					class="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
				>
					🔗
				</button>
			</div>
		</div>
	</div>
	
	<!-- Ad Space Bottom -->
	<div class="w-full h-20 bg-gray-100 border-t flex items-center justify-center text-gray-500 text-sm mt-8">
		<div id="adsterra-bottom-banner">
			<script async="async" data-cfasync="false" src="//pl27434935.profitableratecpm.com/b69b2703918ded0a66b9da0f5f05a76b/invoke.js"></script>
			<div id="container-b69b2703918ded0a66b9da0f5f05a76b"></div>
		</div>
	</div>
</div>
