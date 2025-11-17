// Test MongoDB Connection Script
// Run this with: node test-db-connection.js

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

async function testConnection() {
  const mongoUri = process.env.MONGODB_URI || ''

  console.log('\n🔍 Testing MongoDB Connection...\n')
  
  if (!mongoUri) {
    console.error('❌ ERROR: MONGODB_URI is not set in .env.local')
    console.error('   Please add your MongoDB Atlas connection string to .env.local')
    console.error('   Format: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database\n')
    process.exit(1)
  }

  // Extract connection details (without password)
  const uriMatch = mongoUri.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^/]+)\/(.+)/)
  
  console.log('Configuration:')
  if (uriMatch) {
    console.log(`  Username: ${uriMatch[1]}`)
    console.log(`  Password: *** (${uriMatch[2].length} chars)`)
    console.log(`  Cluster: ${uriMatch[3]}`)
    console.log(`  Database: ${uriMatch[4]}`)
  } else {
    console.log(`  Connection String: ${mongoUri.substring(0, 30)}...`)
  }
  console.log('')

  try {
    console.log('🔌 Attempting to connect to MongoDB Atlas...')
    console.log('')
    
    const startTime = Date.now()
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds
    })
    
    const connectTime = Date.now() - startTime
    
    console.log(`✅ Connection successful! (took ${connectTime}ms)`)
    console.log('')
    
    // Test query
    console.log('🧪 Testing database operations...')
    const db = mongoose.connection.db
    const collections = await db.listCollections().toArray()
    console.log(`✅ Database accessible`)
    console.log(`   Collections found: ${collections.length}`)
    if (collections.length > 0) {
      console.log(`   Collections: ${collections.map(c => c.name).join(', ')}`)
    }
    console.log('')
    
    // Check if registrations collection exists
    const hasRegistrations = collections.some(c => c.name === 'registrations')
    if (hasRegistrations) {
      const count = await db.collection('registrations').countDocuments()
      console.log(`✅ Registrations collection exists with ${count} document(s)`)
    } else {
      console.log(`ℹ️  Registrations collection will be created on first registration`)
    }
    console.log('')
    
    await mongoose.connection.close()
    console.log('✅ Connection closed successfully')
    console.log('\n✅ All tests passed! Your MongoDB connection is working.\n')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Connection failed!\n')
    console.error('📋 Detailed Error Information:')
    console.error(`  Error Name: ${error.name}`)
    console.error(`  Error Message: ${error.message}`)
    console.error('')
    
    if (error.name === 'MongoServerSelectionError') {
      console.log('💡 Troubleshooting:')
      console.log('  1. ❌ Cannot reach MongoDB Atlas cluster')
      console.log('     - Check your internet connection')
      console.log('     - Verify cluster is running in MongoDB Atlas')
      console.log('     - Check if your IP is whitelisted in MongoDB Atlas')
      console.log('')
      console.log('  2. ❌ IP Address not whitelisted')
      console.log('     - Go to MongoDB Atlas → Network Access')
      console.log('     - Add your current IP address (or 0.0.0.0/0 for all)')
      console.log('')
      console.log('  3. ❌ Wrong connection string')
      console.log('     - Verify MONGODB_URI in .env.local')
      console.log('     - Get connection string from MongoDB Atlas → Connect')
      console.log('')
    } else if (error.name === 'MongoAuthenticationError') {
      console.log('💡 Troubleshooting:')
      console.log('  1. ❌ Wrong username or password')
      console.log('     - Check your MongoDB Atlas username and password')
      console.log('     - Verify credentials in MongoDB Atlas → Database Access')
      console.log('')
      console.log('  2. ❌ User doesn\'t have permissions')
      console.log('     - Check user roles in MongoDB Atlas')
      console.log('     - User needs read/write permissions')
      console.log('')
    } else if (error.message.includes('MONGODB_URI')) {
      console.log('💡 Troubleshooting:')
      console.log('  1. ❌ MONGODB_URI not set in .env.local')
      console.log('     - Add: MONGODB_URI=your_connection_string')
      console.log('     - Get connection string from MongoDB Atlas')
      console.log('')
    }
    
    console.log('📖 See MONGODB_SETUP.md for detailed instructions\n')
    process.exit(1)
  }
}

testConnection()
