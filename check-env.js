// Quick script to check your .env.local file for MongoDB
require('dotenv').config({ path: '.env.local' })

console.log('\n📋 Current .env.local Configuration:\n')
console.log(`MONGODB_URI = ${process.env.MONGODB_URI ? 'SET ✅' : 'NOT SET ❌'}`)

if (process.env.MONGODB_URI) {
  // Extract connection details (without password)
  const uriMatch = process.env.MONGODB_URI.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/)
  
  if (uriMatch) {
    console.log(`  Username: ${uriMatch[1]}`)
    console.log(`  Password: *** (${uriMatch[2].length} chars)`)
    console.log(`  Cluster: ${uriMatch[3]}`)
    console.log(`  Database: ${uriMatch[4]}`)
  } else {
    console.log(`  Connection String: ${process.env.MONGODB_URI.substring(0, 50)}...`)
  }
} else {
  console.log('  ⚠️  MONGODB_URI is not set!')
}

console.log('\n🔍 Issues Found:\n')

let hasIssues = false

if (!process.env.MONGODB_URI || process.env.MONGODB_URI === '') {
  console.log('❌ MONGODB_URI NOT SET')
  console.log('   → Add MONGODB_URI to .env.local')
  console.log('   → Get connection string from MongoDB Atlas')
  console.log('   → Format: mongodb+srv://username:password@cluster.mongodb.net/database\n')
  hasIssues = true
} else if (!process.env.MONGODB_URI.includes('mongodb+srv://')) {
  console.log('❌ INVALID CONNECTION STRING FORMAT')
  console.log('   → Should start with: mongodb+srv://')
  console.log('   → Get connection string from MongoDB Atlas → Connect\n')
  hasIssues = true
} else if (process.env.MONGODB_URI.includes('<username>') || process.env.MONGODB_URI.includes('<password>')) {
  console.log('❌ PLACEHOLDER VALUES IN CONNECTION STRING')
  console.log('   → Replace <username> with your MongoDB Atlas username')
  console.log('   → Replace <password> with your MongoDB Atlas password\n')
  hasIssues = true
}

if (!hasIssues) {
  console.log('✅ Configuration looks good!')
  console.log('   Run: node test-db-connection.js to test the connection\n')
} else {
  console.log('📖 Fix the issues above, then run: node test-db-connection.js\n')
  console.log('📖 See MONGODB_SETUP.md for detailed instructions\n')
}
