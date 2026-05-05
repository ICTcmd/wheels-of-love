// /api/ping — Keep Supabase awake + health check
const supabase = require('./_lib/supabase');
const { cors } = require('./_lib/auth');

module.exports = async (req, res) => {
  cors(res);
  res.setHeader('Cache-Control', 'no-store');

  // Show which Supabase URL is being used (safe — not a secret)
  const supabaseUrl = process.env.SUPABASE_URL || 'NOT SET';
  const hasServiceKey = !!process.env.SUPABASE_SERVICE_KEY;
  const hasAnonKey = !!process.env.SUPABASE_ANON_KEY;
  const hasJwt = !!process.env.JWT_SECRET;

  const start = Date.now();
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key')
      .eq('key', 'site_name')
      .single();

    const ms = Date.now() - start;
    return res.status(200).json({
      status: error ? 'degraded' : 'ok',
      db: error ? 'error' : 'connected',
      db_error: error ? error.message : null,
      db_error_code: error ? error.code : null,
      latency_ms: ms,
      env: {
        supabase_url: supabaseUrl,
        has_service_key: hasServiceKey,
        has_anon_key: hasAnonKey,
        has_jwt: hasJwt
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      error: err.message,
      env: {
        supabase_url: supabaseUrl,
        has_service_key: hasServiceKey,
        has_anon_key: hasAnonKey,
        has_jwt: hasJwt
      },
      timestamp: new Date().toISOString()
    });
  }
};
