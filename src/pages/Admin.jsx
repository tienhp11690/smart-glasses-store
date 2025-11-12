import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { formatPrice } from '../utils/currencyFormat'

const Admin = () => {
  const [orders, setOrders] = useState([])
  const [localOrders, setLocalOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, completed, cancelled

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      // Load from GitHub/public
      const response = await fetch(`${import.meta.env.BASE_URL}data/orders.json`)
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }

      // Load from localStorage (orders not yet synced)
      const local = JSON.parse(localStorage.getItem('pendingOrders') || '[]')
      setLocalOrders(local)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const allOrders = [...orders, ...localOrders]
  const filteredOrders = filter === 'all' 
    ? allOrders 
    : allOrders.filter(order => order.status === filter)

  const orderStats = {
    total: allOrders.length,
    pending: allOrders.filter(o => o.status === 'pending').length,
    completed: allOrders.filter(o => o.status === 'completed').length,
    cancelled: allOrders.filter(o => o.status === 'cancelled').length,
  }

  const exportToCSV = () => {
    const headers = ['Order ID', 'Product', 'Customer', 'Phone', 'Email', 'Address', 'Model', 'Size', 'Price', 'Currency', 'Status', 'Date']
    const rows = filteredOrders.map(order => {
      const priceInfo = formatPrice(order.price, order.currency || 'USD')
      return [
        order.orderId,
        order.productName,
        order.customerName,
        order.phone,
        order.email,
        order.address || 'N/A',
        order.model || order.color || 'N/A',
        order.size || 'N/A',
        priceInfo.formatted,
        order.currency || 'USD',
        order.status || 'pending',
        new Date(order.timestamp).toLocaleString()
      ]
    })

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
        <p className="mt-4 text-gray-400">Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-gradient">Order Management</h1>
        <p className="text-gray-400">Quản lý và theo dõi đơn hàng</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Tổng đơn" value={orderStats.total} color="cyan" />
        <StatCard title="Chờ xử lý" value={orderStats.pending} color="yellow" />
        <StatCard title="Hoàn thành" value={orderStats.completed} color="green" />
        <StatCard title="Đã hủy" value={orderStats.cancelled} color="red" />
      </div>

      {/* Filter & Actions */}
      <div className="glass rounded-2xl p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'completed', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  filter === status
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'glass hover:glass-strong text-gray-300'
                }`}
              >
                {status === 'all' ? 'Tất cả' : 
                 status === 'pending' ? 'Chờ xử lý' :
                 status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
              </button>
            ))}
          </div>
          <button
            onClick={exportToCSV}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-full font-semibold text-white transition-all"
          >
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-gray-400 text-lg">Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Mã đơn</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Sản phẩm</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Khách hàng</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Liên hệ</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Giá</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.orderId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-cyan-400">{order.orderId}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold">{order.productName}</div>
                      <div className="text-xs text-gray-400">
                        {order.model || order.color} / {order.size}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{order.customerName}</div>
                      <div className="text-xs text-gray-400">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{order.phone}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-cyan-400">
                      {(() => {
                        const priceInfo = formatPrice(order.price, order.currency || 'USD')
                        return priceInfo.position === 'before' 
                          ? `${priceInfo.symbol}${priceInfo.amount}`
                          : `${priceInfo.amount} ${priceInfo.symbol}`
                      })()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status === 'pending' ? 'Chờ xử lý' :
                         order.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {new Date(order.timestamp).toLocaleDateString('vi-VN')}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {localOrders.length > 0 && (
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-400 text-sm">
            ⚠️ Có {localOrders.length} đơn hàng chưa đồng bộ lên GitHub. 
            Cần cấu hình Netlify Functions với GitHub API.
          </p>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ title, value, color }) => {
  const colorClasses = {
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
    yellow: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30',
    green: 'from-green-500/20 to-green-500/5 border-green-500/30',
    red: 'from-red-500/20 to-red-500/5 border-red-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-2xl p-6`}
    >
      <h3 className="text-gray-400 text-sm font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-gradient">{value}</p>
    </motion.div>
  )
}

export default Admin


